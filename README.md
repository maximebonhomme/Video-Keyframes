# Video-Keyframe
Call functions at a specific time during a video

## Usage
Include jQuery and VideoKeyframe
```html
<script src="jquery.js"></script>
<script src="videoKeyframe.js"></script>
```

Init VideoKeyframe
```javascript
var videoKeyframe = new VideoKeyframe( element );
```

## Methods
### addLabel()
adds a label in the video timeline
- time: `int` time in the video where you want to put the label
- callback: `func` function to be called at that point
- options (optional)

### getLabel()
returns label object
- label: `int` id of the label in the array or `string` label name

### playFrom()
plays the video from a given label
- label: `int` id of the label in the array or `string` label name

## Options
### name
Add a name to your label
```javascript
videoKeyframe.addLabel( 2, myFunction, { name: 'myLabel' } );
```
default: `null`

### pause
Pause the video when you reach the label
```javascript
videoKeyframe.addLabel( 2, myFunction, { pause: true } );
```
default: `false`

## Example
```javascript
    // init videoKeyframe
    var videoKeyframe = new VideoKeyframe( $('video') );

    // add a label at 4sec that will call pause()
    // name it label and pause the video once it reaches it
    videoKeyframe.addLabel(4, pause, {
        name: 'label',
        pause: true
    });

    function pause () {
        // get the first label object
        var label = videoKeyframe.getLabel(0);
        console.log(label);

        // play video after 2sec
        setTimeout(function(){
            videoKeyframe.playFrom( 'label' );
        }, 2000);

    }
```
