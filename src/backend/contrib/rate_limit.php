<?php

class RateLimiter {
    private static $instance = null;
    private $frequency;
    private $duration;
    private $instances;

    public static function getInstance() {
        if(!self::$instance) self::$instance = new RateLimiter(10, 1);

        return self::$instance;
    }
 
    public function __construct($frequency, $duration) {
        $this->frequency = $frequency;
        $this->duration = $duration;
        $this->instances = [];
    }

    public function await() {

        $this->purge();
        $this->instances[] = microtime(true);

        if($this->is_free()) {
            return;
        }
        else {
            $wait_duration = $this->duration_until_free();
            usleep(floor($wait_duration));
            return;
        }
    }

    public function run($callback) {
        if(!is_callable($callback)) {
            return false;
        }

        $this->await();
        $callback();

        return true;
    }
    
    public function purge() {
        $this->instances = RateLimiter::purge_old_instances($this->instances, $this->duration);
    }
    
    public function duration_until_free() {
        return RateLimiter::get_duration_until_free($this->instances, $this->duration);
    }

    public function is_free() {
        return count($this->instances) < $this->frequency;
    }

    public static function get_duration_until_free($instances, $duration) {
        $oldest = $instances[0];
        $free_at = $oldest + $duration * 1000000;
        $now = microtime(true);

        if($free_at < $now) {
            return 0;
        }
        else {
            return $free_at - $now;
        }
    }

    public static function purge_old_instances($instances, $duration) {
        $now = microtime(true);
        $cutoff = $now - $duration;
        return array_filter($instances, function($a) use ($duration, $cutoff) {
            return $a >= $cutoff;
        });
    }
}
?>