(function (scope){

/***
 *    ___________                         .___      
 *    \_   _____/____    ____ _____     __| _/____  
 *     |    __) \__  \ _/ ___\\__  \   / __ |/ __ \ 
 *     |     \   / __ \\  \___ / __ \_/ /_/ \  ___/ 
 *     \___  /  (____  /\___  >____  /\____ |\___  >
 *         \/        \/     \/     \/      \/    \/ 
 */
function Slider(){
    better.Application.call(this, null);
};

for( n in better.Application.prototype ){
    Slider.prototype[n] = better.Application.prototype[n];
}
Slider.prototype.constructor = Slider;

Slider.prototype.init = function(config )
{
    this.setRessource('position', 0);
    this.setRessource('length', config.banners.length);
    this.setRessource('banners', config.banners);
    
    delete config.banners;
    
    this.supr( config );
    
    this.goTo( Event.responsiveEvent.REFRESH );
    this.goTo( Slider.UPDATE_TEXT );
    this.goTo( Slider.TICK );
};

Slider.prototype.initMediators = function( configObject ){
    // banner resize mediator
    this.registerMediator( new BannerResizeMediator( BannerResizeMediator.NAME, configObject ) );
    this.registerMediator( new LayerMediator( LayerMediator.NAME, configObject.layerId ) );
};

Slider.prototype.initProxies = function( configObject ){
    
};

Slider.prototype.initProcesses = function( configObject ){
    this.addCronJob( Slider.NEXT_SLIDE, 6000 , Slider.TICK, -1 );
};

Slider.TICK = "TICK";
Slider.NEXT_SLIDE = "NEXT_SLIDE";
Slider.UPDATE_TEXT = "UPDATE_TEXT";

/***
 *    _________                                           .___      
 *    \_   ___ \  ____   _____   _____ _____    ____    __| _/______
 *    /    \  \/ /  _ \ /     \ /     \\__  \  /    \  / __ |/  ___/
 *    \     \___(  <_> )  Y Y  \  Y Y  \/ __ \|   |  \/ /_/ |\___ \ 
 *     \______  /\____/|__|_|  /__|_|  (____  /___|  /\____ /____  >
 *            \/             \/      \/     \/     \/      \/    \/ 
 */
function Tick(){
    better.AbstractCommand.call(this,null);
};

Tick.prototype = new better.AbstractCommand;
Tick.prototype.constructor = Tick;

Tick.prototype.execute = function( notification ) {
    this.facade.log( 'tick' );
        
    // kill timer and stop listening click event
    var mediator = this.facade.retrieveMediator( LayerMediator.NAME );
    var facade = this.facade;
    facade.stopCronJob( Slider.NEXT_SLIDE );
    mediator.viewComponent.unbind('click', mediator.handleClick );
    
    // get vars
    var position = this.facade.getRessource('position');
    var length = this.facade.getRessource('length');
    var width = $('.container').width();
    var jQueryLayerElem = this.facade.retrieveMediator(BannerResizeMediator.NAME).layer;
    
    // move...
    position++;
    if( position == length ) position = 0;
    
    jQueryLayerElem.animate({
        left: ( position * -1 * width ) + 'px'
    },300, function(){
        mediator.viewComponent.bind('click', {instance:mediator}, mediator.handleClick );
        facade.startCronJob( Slider.NEXT_SLIDE );
    });
    
    
    // set vars
    this.facade.setRessource('position', position);
    this.facade.setRessource('length', length);
    
    // Update Text!
    this.facade.goTo( Slider.UPDATE_TEXT );    
};

function UpdateText(){
    better.AbstractCommand.call(this, null);
};

UpdateText.prototype = new better.AbstractCommand;
UpdateText.prototype.constructor = UpdateText;

UpdateText.prototype.execute = function( notification ){
    this.facade.log('update Text...');
        
    // get vars
    var position = this.facade.getRessource('position');
    var punchlineOne = this.facade.retrieveMediator(BannerResizeMediator.NAME).punchlineOne;
    var punchlineTwo = this.facade.retrieveMediator(BannerResizeMediator.NAME).punchlineTwo;
    var banners = this.facade.getRessource('banners');
    
    // assign texts
    punchlineOne.html( banners[ position ]['Banner']['punchline'] );
    punchlineTwo.html( banners[ position ]['Banner']['sub_punchline'] );
};

/***
 *       _____             .___.__        __                       
 *      /     \   ____   __| _/|__|____ _/  |_  ___________  ______
 *     /  \ /  \_/ __ \ / __ | |  \__  \\   __\/  _ \_  __ \/  ___/
 *    /    Y    \  ___// /_/ | |  |/ __ \|  | (  <_> )  | \/\___ \ 
 *    \____|__  /\___  >____ | |__(____  /__|  \____/|__|  /____  >
 *            \/     \/     \/         \/                       \/ 
 */
function BannerResizeMediator( mediatorName, viewComponent ){
    this.layer = $( viewComponent.layerId );
    this.container = $( viewComponent.containerId );
    this.selection = $( viewComponent.selectionId );
    this.punchlineLayer = $( viewComponent.punchlineLayerId );
    
    this.punchlineOne = $( viewComponent.punchlineOneId );
    this.punchlineTwo = $( viewComponent.punchlineTwoId );
    
    this.items = $(viewComponent.itemClass);
    
    this.ratio = viewComponent.ratio;
    

    better.AbstractMediator.call(this, mediatorName, viewComponent );
};

BannerResizeMediator.prototype = new better.AbstractMediator;
BannerResizeMediator.prototype.constructor = BannerResizeMediator;

BannerResizeMediator.prototype.listNotificationInterests = function(){
    return [Event.responsiveEvent.REFRESH];
};

BannerResizeMediator.prototype.handleNotification = function ( notification ){
    if( notification.name == Event.responsiveEvent.RESIZE_EVENT )
        if( notification.getBody().width > 767 ) this._resize( notification );
};

BannerResizeMediator.prototype._resize = function( notification ){
    // get Sizes
    var width = $('.container').width();
    var height = width / this.ratio;
    
    // resize container
    this.container.height( height );
    
    // resize images
    this.items.width( width );
    this.items.height( height );
    
    // resize layer 
    var position = this.facade.getRessource('position');
    var length = this.facade.getRessource('length');
    this.layer.css({
        width : ( width * length ) + 'px',
        height: height,
        left: ( position * -1 * width ) + 'px'
    });
};

BannerResizeMediator.NAME = "BannerResizeMediator";

function LayerMediator( mediatorName, viewComponent ){
    better.AbstractMediator.call( this, mediatorName, viewComponent );
};

LayerMediator.prototype = new better.AbstractMediator;
LayerMediator.prototype.constructor = LayerMediator;

LayerMediator.prototype.handleClick = function( e ){
    var instance = e.data.instance;
    instance.facade.goTo( wgr.home.Facade.TICK );
};

LayerMediator.NAME = "LayerMediator";



scope.better.Slider = Slider;

})(this); // the 'this' parameter will resolve to global scope in all environments

//var slider = new better.Slider();