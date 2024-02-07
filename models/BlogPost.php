<?php
class BlogPost {
    private $id;
    private $title;
    private $content;
    private $created_on;

    public function __construct($id, $title, $content, $created_on) {
        $this->id = $id;
        $this->title = $title;
        $this->content = $content;
        $this->created_on = $created_on;
    }

    // Getters
    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getContent() {
        return $this->content;
    }

    public function getCreatedOn() {
        return $this->created_on;
    }
}