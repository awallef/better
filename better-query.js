/***
 *    __________        __    __                 ________                              
 *    \______   \ _____/  |__/  |_  ___________  \_____  \  __ __   ___________ ___.__.
 *     |    |  _// __ \   __\   __\/ __ \_  __ \  /  / \  \|  |  \_/ __ \_  __ <   |  |
 *     |    |   \  ___/|  |  |  | \  ___/|  | \/ /   \_/.  \  |  /\  ___/|  | \/\___  |
 *     |______  /\___  >__|  |__|  \___  >__|    \_____\ \_/____/  \___  >__|   / ____|
 *            \/     \/                \/               \__>           \/       \/     
 *
 * 
 *  jQuery better v0.0.1
 *  
 *  Better - Fater - Stronger
 *
 *  insipired by pureMVC Framework and PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 *
 */
(function (scope){


/***
 *       _____       __              __________                             
 *      /  _  \     |__|____  ___  __\______   \_______  _______  ______.__.
 *     /  /_\  \    |  \__  \ \  \/  /|     ___/\_  __ \/  _ \  \/  <   |  |
 *    /    |    \   |  |/ __ \_>    < |    |     |  | \(  <_> >    < \___  |
 *    \____|__  /\__|  (____  /__/\_ \|____|     |__|   \____/__/\_ \/ ____|
 *            \/\______|    \/      \/                             \/\/     
 */
function AjaxProxy( proxyName, data )
{
    better.AbstractProxy.call(this, proxyName, data );
    this._cnx = {};
};

for( n in better.AbstractProxy.prototype ){
    AjaxProxy.prototype[n] = better.AbstractProxy.prototype[n];
}

AjaxProxy.prototype.constructor = AjaxProxy;

AjaxProxy.prototype.setChannels = function( confArray )
{
    for( var i in confArray )
        this.setChannel( confArray[i] );
};

AjaxProxy.prototype.setChannel = function( conf )
{
    var channel = conf.channel;
    this._cnx[channel] = {};
    
    this._cnx[channel].uri = conf.uri;
    this._cnx[channel].type = conf.type;
    this._cnx[channel].method = conf.method;
};

AjaxProxy.prototype.call = function ( channel, parameters, responder )
{
    if(!parameters) parameters = {};
    var uri = this._cnx[channel].uri;
    var method = this._cnx[channel].method;
    var type = this._cnx[channel].type;
    
    this._cnx[channel].responder = responder;
    
    var success = this.success;
    var error = this.error;
    var pointer = this;
    
    $.ajax({
        url: uri,
        type: method,
        dataType: type,
        data: parameters,
        success : function( d ){ success( pointer, channel, d ); },
        error : function( ){ error( pointer, channel ); }
    });
    
};

AjaxProxy.prototype.success = function( pointer, channel, data )
{
     var responder = pointer._cnx[channel].responder;
     responder.onComplete( data );
};

AjaxProxy.prototype.error = function( pointer, channel )
{
     var responder = pointer._cnx[channel].responder;
     responder.onError();
};

AjaxProxy.prototype._cnx = null;

AjaxProxy.NAME = "AjaxProxy";

/***
 *       _____       __                 _________                  .__              
 *      /  _  \     |__|____  ___  ___ /   _____/ ______________  _|__| ____  ____  
 *     /  /_\  \    |  \__  \ \  \/  / \_____  \_/ __ \_  __ \  \/ /  |/ ___\/ __ \ 
 *    /    |    \   |  |/ __ \_>    <  /        \  ___/|  | \/\   /|  \  \__\  ___/ 
 *    \____|__  /\__|  (____  /__/\_ \/_______  /\___  >__|    \_/ |__|\___  >___  >
 *            \/\______|    \/      \/        \/     \/                    \/    \/ 
 */
function AjaxService(facade, name, configObject ){
	better.AbstractService.call(this, facade, name, configObject );
};

for( n in better.AbstractService.prototype ){
    AjaxService.prototype[n] = better.AbstractService.prototype[n];
}

AjaxService.prototype.constructor = AjaxService;

AjaxService.prototype.initProxies = function( configObject )
{
    this.facade.registerProxy( new AjaxProxy( AjaxProxy.NAME ) );
};

/***
 *    .____                     .___.__              __________                                           
 *    |    |    _________     __| _/|__| ____    ____\______   \_______  ____   ____  ____   ______ ______
 *    |    |   /  _ \__  \   / __ | |  |/    \  / ___\|     ___/\_  __ \/  _ \_/ ___\/ __ \ /  ___//  ___/
 *    |    |__(  <_> ) __ \_/ /_/ | |  |   |  \/ /_/  >    |     |  | \(  <_> )  \__\  ___/ \___ \ \___ \ 
 *    |_______ \____(____  /\____ | |__|___|  /\___  /|____|     |__|   \____/ \___  >___  >____  >____  >
 *            \/         \/      \/         \//_____/                              \/    \/     \/     \/ 
 */
function LoadingProcess( proxy, responder, elemMap, urlMap )
{
    this.responder = responder;
    this.elemMap = elemMap;
    this.urlMap = urlMap;
    this.proxy = proxy;
};

LoadingProcess.prototype.onComplete = function()
{
   this.step++;
   this.is_running = false;
   
   if( this.step >=  this.elemMap.length ){
       this.proxy.onComplete();
   }else{
       this.proxy.flush(); 
   }
};

LoadingProcess.prototype.onProgress = function( percentComplete )
{
   this.percentComplete = ( percentComplete + this.step ) / this.elemMap.length;
   this.responder.onProgress( this.percentComplete ); 
};

LoadingProcess.prototype.onError = function()
{
   this.proxy.onError();  
};

LoadingProcess.prototype.kill = function()
{
    this.responder = null;
    this.elemMap = null;
    this.urlMap = null;
    this.proxy = null;
};


LoadingProcess.prototype.is_running = false;
LoadingProcess.prototype.elemMap = null;
LoadingProcess.prototype.urlMap = null;
LoadingProcess.prototype.percentComplete = 0;
LoadingProcess.prototype.step = 0;
LoadingProcess.prototype.proxy = null;
LoadingProcess.prototype.responder = null;

/***
 *    .____                     .___.__              __________                             
 *    |    |    _________     __| _/|__| ____    ____\______   \_______  _______  ______.__.
 *    |    |   /  _ \__  \   / __ | |  |/    \  / ___\|     ___/\_  __ \/  _ \  \/  <   |  |
 *    |    |__(  <_> ) __ \_/ /_/ | |  |   |  \/ /_/  >    |     |  | \(  <_> >    < \___  |
 *    |_______ \____(____  /\____ | |__|___|  /\___  /|____|     |__|   \____/__/\_ \/ ____|
 *            \/         \/      \/         \//_____/                              \/\/     
 */
function LoadingProxy( proxyName, data )
{
    better.AbstractProxy.call( this,proxyName, data );
    this.processMap = [];
};

for( n in better.AbstractProxy.prototype ){
    LoadingProxy.prototype[n] = better.AbstractProxy.prototype[n];
}

LoadingProxy.prototype.constructor = LoadingProxy;

LoadingProxy.prototype.load = function ( htmlElemsToLoadArray, urisToLoadArray, responder )
{
    // set elems to invoke
    if( htmlElemsToLoadArray.isPrototypeOf(String) ){
        var htmlElems = [];
        for( var i in urisToLoadArray ) htmlElems.push( htmlElemsToLoadArray );
        htmlElemsToLoadArray = htmlElems;
    }
    
    this.processMap.push( new LoadingProcess( this, responder, htmlElemsToLoadArray, urisToLoadArray ) );
    
    this.flush();
};

LoadingProxy.prototype.flush = function()
{
    if( this.processMap.length == 0 ) return;
    
    var process = this.processMap[0];
    if( process.is_running ) return;
    
    process.is_running = true;
    
    process.elemMap[ process.step ] = document.createElement( process.elemMap[ process.step ] );
    var task = this._getLoadingTask( process );
    process.elemMap[ process.step ].onprogress = task.onProgress;
    process.elemMap[ process.step ].onload = task.onComplete;
    process.elemMap[ process.step ].onerror = task.onError;
    process.elemMap[ process.step ].src = process.urlMap[ process.step ];
    
    process = null;
    task = null;
};

LoadingProxy.prototype._getLoadingTask = function( process )
{
    var task = {};
    task.onComplete = function()
    {
        process.onProgress( 1 );
        process.onComplete(); 
    };
    task.onProgress = function( e )
    {
        var percentComplete = 0.5;
        if (e.lengthComputable) percentComplete = e.loaded / e.total;
        process.onProgress( percentComplete );  
    };
    task.onError = function()
    {
        process.onProgress( 1 );
        process.onError();  
    };
    
    return task;
};

LoadingProxy.prototype.onComplete = function()
{
    var process = this.processMap.shift();
    
    var elems = process.elemMap;
    var responder = process.responder;
    
    process.kill();
    process = null;
    responder.onComplete( elems );
    this.flush();
};

LoadingProxy.prototype.onError = function()
{
    var process = this.processMap.shift();
    
    var responder = process.responder;
    
    process.kill();
    process = null;
    responder.onError();
    this.flush();
};

LoadingProxy.prototype.processMap = null;

LoadingProxy.NAME = "LoadingProxy";

/***
 *    .____                     .___.__                _________                  .__              
 *    |    |    _________     __| _/|__| ____    ____ /   _____/ ______________  _|__| ____  ____  
 *    |    |   /  _ \__  \   / __ | |  |/    \  / ___\\_____  \_/ __ \_  __ \  \/ /  |/ ___\/ __ \ 
 *    |    |__(  <_> ) __ \_/ /_/ | |  |   |  \/ /_/  >        \  ___/|  | \/\   /|  \  \__\  ___/ 
 *    |_______ \____(____  /\____ | |__|___|  /\___  /_______  /\___  >__|    \_/ |__|\___  >___  >
 *            \/         \/      \/         \//_____/        \/     \/                    \/    \/ 
 */
function LoadingService(facade, name, configObject ){
	better.AbstractService.call(this, facade, name, configObject );
};

for( n in better.AbstractService.prototype ){
    LoadingService.prototype[n] = better.AbstractService.prototype[n];
}

LoadingService.prototype.constructor = LoadingService;

LoadingService.prototype.initProxies = function( configObject )
{
    this.facade.registerProxy( new LoadingProxy( LoadingProxy.NAME ) );
};

/***
 *    __________                                           .__                _____             .___.__        __                
 *    \______   \ ____   ____________   ____   ____   _____|__|__  __ ____   /     \   ____   __| _/|__|____ _/  |_  ___________ 
 *     |       _// __ \ /  ___/\____ \ /  _ \ /    \ /  ___/  \  \/ // __ \ /  \ /  \_/ __ \ / __ | |  \__  \\   __\/  _ \_  __ \
 *     |    |   \  ___/ \___ \ |  |_> >  <_> )   |  \\___ \|  |\   /\  ___//    Y    \  ___// /_/ | |  |/ __ \|  | (  <_> )  | \/
 *     |____|_  /\___  >____  >|   __/ \____/|___|  /____  >__| \_/  \___  >____|__  /\___  >____ | |__(____  /__|  \____/|__|   
 *            \/     \/     \/ |__|               \/     \/              \/        \/     \/     \/         \/                   
 */
function ResponsiveMediator( mediatorName, viewComponent )
{
    viewComponent = $( viewComponent );
    better.AbstractMediator.call(this, mediatorName, viewComponent );
    viewComponent.bind('resize', { instance : this }, this._resize);
};

for( n in better.AbstractMediator.prototype ){
    ResponsiveMediator.prototype[n] = better.AbstractMediator.prototype[n];
}

ResponsiveMediator.prototype.constructor = ResponsiveMediator;

ResponsiveMediator.prototype.listNotificationInterests = function ()
{
    return [better.Event.responsiveEvent.REFRESH];
};
            
ResponsiveMediator.prototype.handleNotification = function (notification)
{
    if( notification.name == better.Event.responsiveEvent.REFRESH )
        this.viewComponent.trigger( 'resize' );
};

ResponsiveMediator.prototype._resize = function( e )
{
    var instance = e.data.instance;
    var windowWidth = instance.viewComponent.width();
    var windoHeight = instance.viewComponent.height();
    var documentWidth = $(document).width();
    var documentHeight = $(document).height();

    instance.facade.goTo( better.Event.responsiveEvent.RESIZE_EVENT, {
        
        windowWidth : windowWidth,
        windoHeight : windoHeight,
        documentWidth : documentWidth,
        documentHeight : documentHeight
        
    }, null );

    instance.facade.log('documentWidth: '+documentWidth+' | documentHeight: '+documentHeight+' | windowWidth: '+windowWidth+' | windoHeight: '+windoHeight);
};

ResponsiveMediator.NAME = "ResponsiveMediator";

/***
 *    __________                                           .__               _________                  .__              
 *    \______   \ ____   ____________   ____   ____   _____|__|__  __ ____  /   _____/ ______________  _|__| ____  ____  
 *     |       _// __ \ /  ___/\____ \ /  _ \ /    \ /  ___/  \  \/ // __ \ \_____  \_/ __ \_  __ \  \/ /  |/ ___\/ __ \ 
 *     |    |   \  ___/ \___ \ |  |_> >  <_> )   |  \\___ \|  |\   /\  ___/ /        \  ___/|  | \/\   /|  \  \__\  ___/ 
 *     |____|_  /\___  >____  >|   __/ \____/|___|  /____  >__| \_/  \___  >_______  /\___  >__|    \_/ |__|\___  >___  >
 *            \/     \/     \/ |__|               \/     \/              \/        \/     \/                    \/    \/ 
 */
function ResponsiveService(facade, name, configObject ){
	better.AbstractService.call(this, facade, name, configObject );
};

for( n in better.AbstractService.prototype ){
    ResponsiveService.prototype[n] = better.AbstractService.prototype[n];
}

ResponsiveService.prototype.constructor = ResponsiveService;

ResponsiveService.prototype.initMediators = function( configObject )
{
	this.facade.registerMediator( new ResponsiveMediator( ResponsiveMediator.NAME, window ) );
};

/***
 *       _____                .__  .__               __  .__               
 *      /  _  \ ______ ______ |  | |__| ____ _____ _/  |_|__| ____   ____  
 *     /  /_\  \\____ \\____ \|  | |  |/ ___\\__  \\   __\  |/  _ \ /    \ 
 *    /    |    \  |_> >  |_> >  |_|  \  \___ / __ \|  | |  (  <_> )   |  \
 *    \____|__  /   __/|   __/|____/__|\___  >____  /__| |__|\____/|___|  /
 *            \/|__|   |__|                \/     \/                    \/ 
 */
function Application()
{
	better.AbstractFacade.call(this, null);
    this._addJQBServices();
};

for( n in better.AbstractFacade.prototype ){
    Application.prototype[n] = better.AbstractFacade.prototype[n];
}

Application.prototype.constructor = Application;

Application.prototype.init = function( configObject ){
	this.goTo( Event.responsiveEvent.REFRESH );
};

Application.prototype._addJQBServices = function(  )
{
    this.addService( 'AJAX', AjaxService, {} );
    this.ajax = this.retrieveProxy( AjaxProxy.NAME );
    
    this.addService( 'LOADING', LoadingService, {} );
    this.loader = this.retrieveProxy( LoadingProxy.NAME );
    
    this.addService( 'RESPONSIVE', ResponsiveService, {} );
};

better.Application = Application;

})(this); // the 'this' parameter will resolve to global scope in all environments