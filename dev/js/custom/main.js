;var VideoLabel = function($video) {
    var _this = this;
    this.video = $video[0];
    this.duration = 0;
    this.currentTime = 0;
    this.isPlaying = false;
    this.labels = [];
    this.interval = 0;
    this.speed = 50;
    this.calling = false;

    this.settings = {
        name: null,
        pause: false
    };

    $video.on('canplay', this.init.bind(this));
    $video.on('playing', this.playing.bind(this));
    $video.on('pause', this.paused.bind(this));
    $video.on('ended', this.paused.bind(this));
};

VideoLabel.prototype = {

    init: function() {
        var _this = this;
        this.duration = this.video.duration;

        this.interval = setInterval(this.update.bind(this), this.speed);
    },

    addLabel: function(time, callback, options) {
        var opts = $.extend( {}, this.settings, options );
        var label = {
            time: time,
            callback: callback,
            options: opts
        }

        if(time === undefined || callback === undefined) return;

        this.labels.push(label);
    },

    getLabel: function(id) {
        var type = typeof id;
        var _this = this;
        
        if(type === 'number') {

            if(this.labels[id] === undefined) {
                console.log('getLabel() - no label found for id ' + id);
                return;
            } else {
                return this.labels[id];
            }

        } else if (type === 'string') {

            var label = $.grep(this.labels, function(e){ return e.options.name == id; });

            if(!label.length) {
                console.log('getLabel() - no label found for id ' + id);
                return;
            } else {
                return label[0];
            }

        } else {

            console.log('getLabel() - int or string only');
            return;

        }
    },

    playFrom: function(id) {
        var type = typeof id;
        var _this = this;
        
        if(type === 'number') {

            if(this.labels[id] === undefined) {
                console.log('playFrom() - no label found for id ' + id);
                return;
            } else {
                console.log(this.labels[id]);
                this.currentTime = this.labels[id].time;
            }

        } else if (type === 'string') {

            var label = $.grep(this.labels, function(e){ return e.options.name == id; });

            if(label === undefined) {
                console.log('playFrom() - no label found for id ' + id);
                return;
            } else {
                this.currentTime = label[0].time;
            }

        } else {

            console.log('playFrom() - int or string only');
            return;

        }

        this.video.play();
    },

    seekLabels: function() {
        var _this = this;
        
        $.each(this.labels, function() {
            var time = parseFloat(this.time.toFixed(1));
            var callback = this.callback;
            var options = this.options;

            if(time === _this.currentTime && !_this.calling) {
                if(options.pause) {
                    _this.video.pause();
                }

                callback();
                _this.calling = true;

                setTimeout(function(){
                    _this.calling = false;
                }, 50);
            }
        });

    },

    playing: function() {
        this.isPlaying = true;
        this.interval = setInterval(this.update.bind(this), this.speed);
    },

    paused: function() {
        this.isPlaying = false;
    },

    update: function() {
        var _this = this;

        if(this.isPlaying) {
            this.currentTime = parseFloat(this.video.currentTime.toFixed(1));

            this.seekLabels();
        } else {
            clearInterval(this.interval);
            this.interval = 0;
        }
    }

};
