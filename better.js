/***
 *    __________        __    __                
 *    \______   \ _____/  |__/  |_  ___________ 
 *     |    |  _// __ \   __\   __\/ __ \_  __ \
 *     |    |   \  ___/|  |  |  | \  ___/|  | \/
 *     |______  /\___  >__|  |__|  \___  >__|   
 *            \/     \/                \/       
 *
 * 
 *  better v0.0.1
 *  
 *  Better - Faster - Stronger
 *
 *  insipired by pureMVC Framework and PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 *
 *  Reuse governed by Creative Commons Attribution 3.0 
 *  http://creativecommons.org/licenses/by/3.0/us/
 *  
 *  more infos https://github.com/awallef/better
 *
 */
(function(scope) {

    if (null == scope)
        scope = window;

    // if the global better namespace already exists, turn back now
    if (scope.better)
    {
        return;
    }

    /* implementation begin */

    /***
     *     _______          __  .__  _____.__              
     *     \      \   _____/  |_|__|/ ____\__| ___________ 
     *     /   |   \ /  _ \   __\  \   __\|  |/ __ \_  __ \
     *    /    |    (  <_> )  | |  ||  |  |  \  ___/|  | \/
     *    \____|__  /\____/|__| |__||__|  |__|\___  >__|   
     *            \/                              \/       
     */
    function Notifier()
    {
    }

    Notifier.prototype.sendNotification = function(notificationName, body, type)
    {
        if (this.facade)
        {
            this.facade.sendNotification(notificationName, body, type);
        }
    };

    Notifier.prototype.facade = null;

    /***
     *     _______          __  .__  _____.__               __  .__                  ___ ___                     .___            
     *     \      \   _____/  |_|__|/ ____\__| ____ _____ _/  |_|__| ____   ____    /   |   \   ____ _____     __| _/___________ 
     *     /   |   \ /  _ \   __\  \   __\|  |/ ___\\__  \\   __\  |/  _ \ /    \  /    ~    \_/ __ \\__  \   / __ |/ __ \_  __ \
     *    /    |    (  <_> )  | |  ||  |  |  \  \___ / __ \|  | |  (  <_> )   |  \ \    Y    /\  ___/ / __ \_/ /_/ \  ___/|  | \/
     *    \____|__  /\____/|__| |__||__|  |__|\___  >____  /__| |__|\____/|___|  /  \___|_  /  \___  >____  /\____ |\___  >__|   
     *            \/                              \/     \/                    \/         \/       \/     \/      \/    \/       
     */
    function NotificationHeader(processName, pid, step, time)
    {
        this.processName = processName;
        this.pid = pid;
        this.step = step;
        this.time = time;
    }

    NotificationHeader.prototype.kill = function()
    {
        this.processName = null;
        this.pid = null;
        this.time = null;
        this.step = null;
    };

    NotificationHeader.prototype.processName = null;
    NotificationHeader.prototype.pid = null;
    NotificationHeader.prototype.time = null;
    NotificationHeader.prototype.step = null;

    /***
     *     _______          __  .__  _____.__               __  .__               
     *     \      \   _____/  |_|__|/ ____\__| ____ _____ _/  |_|__| ____   ____  
     *     /   |   \ /  _ \   __\  \   __\|  |/ ___\\__  \\   __\  |/  _ \ /    \ 
     *    /    |    (  <_> )  | |  ||  |  |  \  \___ / __ \|  | |  (  <_> )   |  \
     *    \____|__  /\____/|__| |__||__|  |__|\___  >____  /__| |__|\____/|___|  /
     *            \/                              \/     \/                    \/ 
     */
    function Notification(name, body, type, header)
    {
        this.name = name;
        this.body = body;
        this.type = type;
        this.header = header;
    }

    Notification.prototype.getHeader = function() {
        return this.header;
    };

    Notification.prototype.setHeader = function(header) {
        this.header = header;
    };

    Notification.prototype.getName = function() {
        return this.name;
    };

    Notification.prototype.getBody = function() {
        return this.body;
    };

    Notification.prototype.setBody = function(body) {
        this.body = body;
    };

    Notification.prototype.getType = function() {
        return this.type;
    };

    Notification.setType = function(type) {
        this.type = type;
    };

    Notification.prototype.name = null;
    Notification.prototype.body = null;
    Notification.prototype.type = null;
    Notification.prototype.header = null;

    /***
     *    ________ ___.                                           
     *    \_____  \\_ |__   ______ ______________  __ ___________ 
     *     /   |   \| __ \ /  ___// __ \_  __ \  \/ // __ \_  __ \
     *    /    |    \ \_\ \\___ \\  ___/|  | \/\   /\  ___/|  | \/
     *    \_______  /___  /____  >\___  >__|    \_/  \___  >__|   
     *            \/    \/     \/     \/                 \/       
     */
    function Observer(notifyMethod, notifyContext) {
        this.setNotifyMethod(notifyMethod);
        this.setNotifyContext(notifyContext);
    }

    Observer.prototype = new Notifier;
    Observer.prototype.constructor = Observer;

    Observer.prototype.setNotifyMethod = function(notifyMethod)
    {
        this.notify = notifyMethod;
    };

    Observer.prototype.setNotifyContext = function(notifyContext)
    {
        this.context = notifyContext;
    };

    Observer.prototype.getNotifyMethod = function()
    {
        return this.notify;
    };

    Observer.prototype.getNotifyContext = function()
    {
        return this.context;
    };

    Observer.prototype.notifyObserver = function(notification)
    {
        this.getNotifyMethod().call(this.getNotifyContext(), notification);
    };

    Observer.prototype.compareNotifyContext = function(object)
    {
        return object === this.context;
    };

    Observer.prototype.notify = null;
    Observer.prototype.context = null;

    /***
     *       _____ ___.             __                        __ __________                             
     *      /  _  \\_ |__   _______/  |_____________    _____/  |\______   \_______  _______  ______.__.
     *     /  /_\  \| __ \ /  ___/\   __\_  __ \__  \ _/ ___\   __\     ___/\_  __ \/  _ \  \/  <   |  |
     *    /    |    \ \_\ \\___ \  |  |  |  | \// __ \\  \___|  | |    |     |  | \(  <_> >    < \___  |
     *    \____|__  /___  /____  > |__|  |__|  (____  /\___  >__| |____|     |__|   \____/__/\_ \/ ____|
     *            \/    \/     \/                   \/     \/                                  \/\/     
     */
    function AbstractProxy(proxyName, data) {
        this.proxyName = proxyName || this.constructor.NAME;
        if (data != null)
        {
            this.setData(data);
        }
    }

    AbstractProxy.prototype = new Notifier;
    AbstractProxy.prototype.constructor = AbstractProxy;

    AbstractProxy.prototype.getProxyName = function()
    {
        return this.proxyName;
    };

    AbstractProxy.prototype.setData = function(data)
    {
        this.data = data;
    };

    AbstractProxy.prototype.getData = function()
    {
        return this.data;
    };

    AbstractProxy.prototype.onRegister = function()
    {
        return;
    };

    AbstractProxy.prototype.onRemove = function()
    {
        return;
    };

    AbstractProxy.NAME = "AbstractProxy";

    AbstractProxy.prototype.proxyName = null;
    AbstractProxy.prototype.data = null;

    /***
     *       _____ ___.             __                        __     _____             .___.__        __                
     *      /  _  \\_ |__   _______/  |_____________    _____/  |_  /     \   ____   __| _/|__|____ _/  |_  ___________ 
     *     /  /_\  \| __ \ /  ___/\   __\_  __ \__  \ _/ ___\   __\/  \ /  \_/ __ \ / __ | |  \__  \\   __\/  _ \_  __ \
     *    /    |    \ \_\ \\___ \  |  |  |  | \// __ \\  \___|  | /    Y    \  ___// /_/ | |  |/ __ \|  | (  <_> )  | \/
     *    \____|__  /___  /____  > |__|  |__|  (____  /\___  >__| \____|__  /\___  >____ | |__(____  /__|  \____/|__|   
     *            \/    \/     \/                   \/     \/             \/     \/     \/         \/                   
     */
    function AbstractMediator(mediatorName, viewComponent) {
        this.mediatorName = mediatorName || this.constructor.NAME;
        this.viewComponent = viewComponent;
    }

    AbstractMediator.prototype = new Notifier;
    AbstractMediator.prototype.constructor = AbstractMediator;

    AbstractMediator.prototype.getMediatorName = function()
    {
        return this.mediatorName;
    };

    AbstractMediator.prototype.setViewComponent = function(viewComponent)
    {
        this.viewComponent = viewComponent;
    };

    AbstractMediator.prototype.getViewComponent = function()
    {
        return this.viewComponent;
    };

    AbstractMediator.prototype.listNotificationInterests = function()
    {
        return [];
    };

    AbstractMediator.prototype.handleNotification = function(notification)
    {
        return;
    };

    AbstractMediator.prototype.onRegister = function()
    {
        return;
    };

    AbstractMediator.prototype.onRemove = function()
    {
        return;
    };

    AbstractMediator.prototype.mediatorName = null;
    AbstractMediator.prototype.viewComponent = null;

    AbstractMediator.NAME = "AbstractMediator";


    /***
     *       _____ ___.             __                        __   _________                                           .___
     *      /  _  \\_ |__   _______/  |_____________    _____/  |_ \_   ___ \  ____   _____   _____ _____    ____    __| _/
     *     /  /_\  \| __ \ /  ___/\   __\_  __ \__  \ _/ ___\   __\/    \  \/ /  _ \ /     \ /     \\__  \  /    \  / __ | 
     *    /    |    \ \_\ \\___ \  |  |  |  | \// __ \\  \___|  |  \     \___(  <_> )  Y Y  \  Y Y  \/ __ \|   |  \/ /_/ | 
     *    \____|__  /___  /____  > |__|  |__|  (____  /\___  >__|   \______  /\____/|__|_|  /__|_|  (____  /___|  /\____ | 
     *            \/    \/     \/                   \/     \/              \/             \/      \/     \/     \/      \/ 
     */
    function AbstractCommand(notification)
    {
        this.notification = notification;
    }

    AbstractCommand.prototype = new Notifier;
    AbstractCommand.prototype.constructor = AbstractCommand;

    AbstractCommand.prototype.execute = function(notification)
    {

    };

    AbstractCommand.prototype.nextCommand = function()
    {
        if (this.notification)
        {
            if (this.notification.header)
            {
                if (this.notification.header.processName)
                    this.facade.nextCommand(this.notification);
            }
        }

        this.kill();
    };

    AbstractCommand.prototype.kill = function()
    {
        this.facade = null;
        this.notification = null;
        this.execute = null;
    };

    AbstractCommand.prototype.notification = null;

    /***
     *       _____ ___.             __                        __   _________                  .__              
     *      /  _  \\_ |__   _______/  |_____________    _____/  |_/   _____/ ______________  _|__| ____  ____  
     *     /  /_\  \| __ \ /  ___/\   __\_  __ \__  \ _/ ___\   __\_____  \_/ __ \_  __ \  \/ /  |/ ___\/ __ \ 
     *    /    |    \ \_\ \\___ \  |  |  |  | \// __ \\  \___|  | /        \  ___/|  | \/\   /|  \  \__\  ___/ 
     *    \____|__  /___  /____  > |__|  |__|  (____  /\___  >__|/_______  /\___  >__|    \_/ |__|\___  >___  >
     *            \/    \/     \/                   \/     \/            \/     \/                    \/    \/ 
     */
    function AbstractService(facade, name, configObject)
    {
        this.facade = facade;
        this.name = name;
        this.initializeService(configObject);
    }

    AbstractService.prototype = new Notifier;
    AbstractService.prototype.constructor = AbstractService;

    AbstractService.prototype.initializeService = function(configObject)
    {
        this.initProxies(configObject);
        this.initMediators(configObject);
        this.initCommands(configObject);
        this.initProcesses(configObject);

        this.runInstall(configObject);
    };

    AbstractService.prototype.initProxies = function(configObject) {
    };
    AbstractService.prototype.initMediators = function(configObject) {
    };
    AbstractService.prototype.initCommands = function(configObject) {
    };
    AbstractService.prototype.initProcesses = function(configObject) {
    };

    AbstractService.prototype.runInstall = function(configObject) {
    };


    AbstractService.prototype.removeService = function(  )
    {
        this.removeProxies(  );
        this.removeMediators(  );
        this.removeCommands(  );
        this.removeProcesses(  );

        this.runUninstall(  );
    };

    AbstractService.prototype.removeProxies = function(  ) {
    };
    AbstractService.prototype.removeMediators = function(  ) {
    };
    AbstractService.prototype.removeCommands = function(  ) {
    };
    AbstractService.prototype.removeProcesses = function(  ) {
    };

    AbstractService.prototype.runUninstall = function(  ) {
    };

    AbstractService.prototype.name = null;
    AbstractService.prototype.facade = null;

    /***
     *    __________                                                       
     *    \______   \_______  ____   ____  ____   ______ _________________ 
     *     |     ___/\_  __ \/  _ \_/ ___\/ __ \ /  ___//  ___/  _ \_  __ \
     *     |    |     |  | \(  <_> )  \__\  ___/ \___ \ \___ (  <_> )  | \/
     *     |____|     |__|   \____/ \___  >___  >____  >____  >____/|__|   
     *                                  \/    \/     \/     \/             
     */
    function Processor( )
    {
        this.processMap = {};
        this.activeProcesses = {};
    }

    Processor.prototype.hasProcess = function(processName)
    {
        return (this.processMap[processName]) ? true : false;
    };

    Processor.prototype.registerProcess = function(processName, tasksArray)
    {
        this.processMap[processName] = new Process(Processor.getNewProcessId(), tasksArray);
    };

    Processor.prototype.removeProcess = function(processName)
    {
        delete this.processMap[processName];
    };

    Processor.prototype.extractTasksFromProcess = function(processName)
    {
        var tasks = [];
        for (var i in this.processMap[processName].tasksArray)
        {
            var task = this.processMap[processName].tasksArray[ i ];
            if (this.processMap.hasOwnProperty(task))
            {
                tasks = Array.prototype.concat(tasks, this.extractTasksFromProcess(task));
            } else {
                tasks.push(task);
            }
        }

        return tasks;
    };

    Processor.prototype.execute = function(processName, body, type)
    {
        if (this.processMap.hasOwnProperty(processName))
        {
            this.processMap[processName].tasksArray = this.extractTasksFromProcess(processName);
            this.processMap[processName].step = 0;
            this.facade.log('Processor -> start ' + processName);
            this.activeProcesses[ this.processMap[processName].pid ] = this.processMap[processName];
            this._exec(processName, body, type);
        } else {
            this.facade.log("! Processor -> process " + processName + " dosen't exist");
        }
    };

    Processor.prototype.nextCommand = function(notification)
    {
        var processName = notification.header.processName;
        if (this.processMap.hasOwnProperty(processName))
        {
            if (!this.processMap[processName].isOver())
            {
                this.processMap[processName].step++;
                var body = notification.getBody();
                var type = notification.getType();
                notification.header.kill();
                notification.header = null;
                notification.body = null;
                notification.type = null;
                notification = null;
                this._exec(processName, body, type);
                processName = null;
                body = null;
                type = null;
            } else {
                this.processMap[processName].state = Process.READY;
                delete this.activeProcesses[ this.processMap[processName].pid ];
                this.facade.log("Processor -> process " + processName + " is Finished");
            }

        } else {
            this.facade.log("! Processor -> process " + processName + " dosen't exist");
        }
    };

    Processor.prototype._exec = function(processName, body, type)
    {
        var process = this.processMap[processName];
        process.state = Process.RUNNING;
        var task = process.getCurrentTask();
        var header = new NotificationHeader(processName, process.pid, process.step, new Date());
        this.facade.log('Processor -> _exec task: ' + task);
        this.facade.sendNotification(task, body, type, header);

        process = null;
        //task = null;
        //type = null;
        //header.kill();
        //header = null;
    };

    Processor.prototype.processMap = null;
    Processor.prototype.facade = null;
    Processor.prototype.activeProcesses = null;

    Processor.getNewProcessId = function()
    {
        return Processor.lastProcessId++;
    };

    Processor.lastProcessId = 0;

    /***
     *      _________                                                     
     *     /   _____/ ____  ________ __   ____   ____   ____  ___________ 
     *     \_____  \_/ __ \/ ____/  |  \_/ __ \ /    \_/ ___\/ __ \_  __ \
     *     /        \  ___< <_|  |  |  /\  ___/|   |  \  \__\  ___/|  | \/
     *    /_______  /\___  >__   |____/  \___  >___|  /\___  >___  >__|   
     *            \/     \/   |__|           \/     \/     \/    \/       
     */
    function Sequencer() {
    }

    Sequencer.prototype.facade = null;
    Sequencer.prototype._cronStack = {};
    Sequencer.prototype._animationFrameStack = {};
    Sequencer.prototype._runningFrameStack = [];
    Sequencer.prototype._isFrameLoopRunnig = false;

    Sequencer.prototype.goTo = function(label, body, type)
    {
        if (body == null)
            body = {};
        this._exec(label, body, type);
    };

    Sequencer.prototype.cronExec = function(note)
    {
        this.goTo(note.name, note.body, note.type);
    };

    Sequencer.prototype._exec = function(label, body, type)
    {
        if (this.facade.controller.processor.hasProcess(label))
        {
            this.facade.controller.processor.execute(label, body, type);
        } else {
            this.facade.sendNotification(label, body, type);
        }
    };

    /* Animation request JOB
     **********************************************/
    Sequencer.prototype.registerAnimationFrameJob = function(labelOrName, note)
    {
        this._animationFrameStack[labelOrName] = note;
    };

    Sequencer.prototype.startAnimationFrameJob = function(labelOrName)
    {
        if (!this._animationFrameStack[labelOrName])
            return;
        var doesJobExists = false;
        for (var i = 0; i < this._runningFrameStack.length; i++)
        {
            if (this._runningFrameStack[i] == labelOrName)
            {
                doesJobExists = true;
            }
        }
        if (!doesJobExists)
        {
            this._runningFrameStack.push(labelOrName);
        }
        if (!this._isFrameLoopRunnig)
        {
            this.facade.log('Start Animation Frame loop');
            this._isFrameLoopRunnig = true;
            this.loop();
        }
    };

    Sequencer.prototype.stopAnimationFrameJob = function(labelOrName, andDestroy)
    {
        if (this._animationFrameStack[labelOrName])
        {
            var newStack = [];
            for (var i = 0; i < this._runningFrameStack.length; i++)
            {
                if (this._runningFrameStack[i] != labelOrName)
                {
                    newStack = this._runningFrameStack[i];
                }
            }

            this._runningFrameStack = newStack;

            if (this._runningFrameStack.length == 0) {
                this.facade.log('Stop Animation Frame loop');
                this._isFrameLoopRunnig = false;
            }

            if (andDestroy)
            {
                delete this._animationFrameStack[labelOrName];
            }

        }
    };

    Sequencer.prototype.stopAllAnimationFrameJob = function(andDestroy)
    {
        for (var i in this._cronStack)
        {
            this._runningFrameStack = [];
            this.facade.log('Stop Animation Frame loop');
            this._isFrameLoopRunnig = false;
            if (andDestroy)
            {
                this._animationFrameStack = {};
            }
        }
    };

    Sequencer.prototype.loop = function()
    {
        if (!this._isFrameLoopRunnig)
            return;

        requestAnimationFrame((function(self) {
            return function() {
                self.loop();
            }
        })(this));

        for (var i = 0; i < this._runningFrameStack.length; i++)
        {
            this.cronExec(this._animationFrameStack[ this._runningFrameStack[i] ]);
        }
    };

    /* CRON JOB
     **********************************************/
    Sequencer.prototype.registerCronJob = function(labelOrName, delay, note, stopCount)
    {

        if (!this._cronStack[labelOrName])
        {
            this._cronStack[labelOrName] = new CronJob(this, labelOrName, delay, note, stopCount);
        } else {

            var cron = this._cronStack[labelOrName];
            cron.stop();
            cron.labelOrName = labelOrName;
            cron.delay = delay;
            cron.note = note;
            cron.stopCount = stopCount;
        }

    };

    Sequencer.prototype.startCronJob = function(labelOrName)
    {
        if (this._cronStack[labelOrName])
            (this._cronStack[labelOrName]).start();
    };

    Sequencer.prototype.stopCronJob = function(labelOrName, andDestroy)
    {
        if (this._cronStack[labelOrName])
        {
            this._cronStack[labelOrName].stop();
            if (andDestroy)
            {
                this._cronStack[labelOrName].destroy();
                delete this._cronStack[labelOrName];
            }

        }
    };

    Sequencer.prototype.stopAllCronJob = function(andDestroy)
    {
        for (var i in this._cronStack)
        {
            this._cronStack[i].stop();
            if (andDestroy)
            {
                this._cronStack[i].destroy();
                delete this._cronStack[i];
            }
        }
    };

    /***
     *    _________                            ____.     ___.    
     *    \_   ___ \_______  ____   ____      |    | ____\_ |__  
     *    /    \  \/\_  __ \/  _ \ /    \     |    |/  _ \| __ \ 
     *    \     \____|  | \(  <_> )   |  \/\__|    (  <_> ) \_\ \
     *     \______  /|__|   \____/|___|  /\________|\____/|___  /
     *            \/                   \/                     \/ 
     */
    function CronJob(responder, labelOrName, delay, note, stopCount)
    {
        this.responder = responder;
        this.labelOrName = labelOrName;
        this.delay = delay;
        this.note = note;
        this.stopCount = stopCount || -1;
        this.counter = 0;
    }

    CronJob.prototype.start = function()
    {
        this.isRunning = true;
        this.id = setInterval((function(self) {
            return function() {
                self.tick();
            }
        })(this), this.delay);
    };

    CronJob.prototype.tick = function()
    {
        if (this.stopCount < 0)
        {
            this.responder.cronExec(this.note);
            return;
        }
        this.counter++;
        this.responder.cronExec(this.note);

        if (this.counter == this.stopCount)
            clearInterval(this.id);

        if (this.counter == Number.MAX_VALUE)
            this.counter = 0;
    };

    CronJob.prototype.stop = function()
    {
        this.counter = 0;
        clearInterval(this.id);
        this.isRunning = false;
    };

    CronJob.prototype.destroy = function()
    {
        this.stop();
        this.responder = null;
        this.labelOrName = null;
        this.delay = 0;
        this.note = null;
        this.stopCount = 0;
        this.counter = 0;
    };

    CronJob.prototype.id = null;
    CronJob.prototype.note = null;
    CronJob.prototype.counter = null;
    CronJob.prototype.responder = null;
    CronJob.prototype.delay = null;
    CronJob.prototype.stopCount = null;
    CronJob.prototype.labelOrName = null;
    CronJob.prototype.isRunning = false;

    /***
     *    ___________                    __     ___ ___                    .___.__                
     *    \_   _____/__  __ ____   _____/  |_  /   |   \_____    ____    __| _/|  |   ___________ 
     *     |    __)_\  \/ // __ \ /    \   __\/    ~    \__  \  /    \  / __ | |  | _/ __ \_  __ \
     *     |        \\   /\  ___/|   |  \  |  \    Y    // __ \|   |  \/ /_/ | |  |_\  ___/|  | \/
     *    /_______  / \_/  \___  >___|  /__|   \___|_  /(____  /___|  /\____ | |____/\___  >__|   
     *            \/           \/     \/             \/      \/     \/      \/           \/       
     */

    function EventHandler() {

    }

    EventHandler.prototype.facade = null;
    EventHandler.prototype._handlerStack = {};

    EventHandler.prototype.registerEventHandler = function(labelOrName, element, event, note, useCapture, stopPropagation)
    {
        this._handlerStack[ labelOrName ] = {
            element: element,
            event: event,
            note: note,
            useCapture: useCapture,
            stopPropagation: stopPropagation
        }

        element.addEventListener(
                event,
                this.handleEvent.bind(null, this, labelOrName),
                useCapture
                );
    };

    EventHandler.prototype.removeEventHandler = function(labelOrName)
    {
        if (!this._handlerStack[ labelOrName ])
            return;

        this._handlerStack[ labelOrName ]['element'].addEventListener(
                this._handlerStack[ labelOrName ]['event'],
                this.handleEvent.bind(null, this, labelOrName),
                this._handlerStack[ labelOrName ]['useCapture']
                );

        delete this._handlerStack[ labelOrName ];
    };

    EventHandler.prototype.handleEvent = function(self, labelOrName, evt)
    {
        if (!self._handlerStack[ labelOrName ])
            return;

        var obj = self._handlerStack[ labelOrName ]

        if (obj.stopPropagation)
        {
            evt.stopPropagation();
        }

        self.facade.goTo(obj.note.name, obj.note.body, obj.note.type);
    };

    /***
     *    __________                                           
     *    \______   \_______  ____   ____  ____   ______ ______
     *     |     ___/\_  __ \/  _ \_/ ___\/ __ \ /  ___//  ___/
     *     |    |     |  | \(  <_> )  \__\  ___/ \___ \ \___ \ 
     *     |____|     |__|   \____/ \___  >___  >____  >____  >
     *                                  \/    \/     \/     \/ 
     */
    function Process(pid, tasksArray)
    {
        this.pid = pid;
        this.step = 0;
        this.tasksArray = tasksArray;
        this.state = this.constructor.READY;
    }

    Process.prototype.getCurrentTask = function()
    {
        return this.tasksArray[ this.step ];
    };

    Process.prototype.isOver = function()
    {
        return (this.step == this.tasksArray.length - 1) ? true : false;
    };

    Process.prototype.pid = null;
    Process.prototype.step = null;
    Process.prototype.tasksArray = null;

    Process.READY = 'Process.READY';
    Process.RUNNING = 'Process.RUNNING';
    Process.CRASHED = 'Process.CRASHED';

    /***
     *    ____   ____.__               
     *    \   \ /   /|__| ______  _  __
     *     \   Y   / |  |/ __ \ \/ \/ /
     *      \     /  |  \  ___/\     / 
     *       \___/   |__|\___  >\/\_/  
     *                       \/        
     */
    function View( )
    {
        this.mediatorMap = [];
        this.observerMap = [];
    }

    View.prototype.registerObserver = function(notificationName, observer)
    {
        if (this.observerMap[notificationName] != null)
        {
            this.observerMap[notificationName].push(observer);
        }
        else
        {
            this.observerMap[notificationName] = [observer];
        }
    };

    View.prototype.notifyObservers = function(notification)
    {
        if (this.observerMap[notification.getName()] != null)
        {
            var observers_ref = this.observerMap[notification.getName()], observers = [], observer

            for (var i = 0; i < observers_ref.length; i++)
            {
                observer = observers_ref[i];
                observers.push(observer);
            }

            for (var i = 0; i < observers.length; i++)
            {
                observer = observers[i];
                observer.notifyObserver(notification);
            }
        }
    };

    View.prototype.removeObserver = function(notificationName, notifyContext)
    {
        var observers = this.observerMap[notificationName];
        for (var i = 0; i < observers.length; i++)
        {
            if (observers[i].compareNotifyContext(notifyContext) == true)
            {
                observers.splice(i, 1);
                break;
            }
        }

        if (observers.length == 0)
        {
            delete this.observerMap[notificationName];
        }
    };

    View.prototype.registerMediator = function(mediator)
    {
        if (this.mediatorMap[mediator.getMediatorName()] != null)
        {
            return;
        }

        mediator.facade = this.facade;
        // register the mediator for retrieval by name
        this.mediatorMap[mediator.getMediatorName()] = mediator;

        // get notification interests if any
        var interests = mediator.listNotificationInterests();

        // register mediator as an observer for each notification
        if (interests.length > 0)
        {
            // create observer referencing this mediators handleNotification method
            var observer = new Observer(mediator.handleNotification, mediator);
            for (var i = 0; i < interests.length; i++)
            {
                this.registerObserver(interests[i], observer);
            }
        }

        mediator.onRegister();
    };

    View.prototype.retrieveMediator = function(mediatorName)
    {
        return this.mediatorMap[mediatorName];
    };

    View.prototype.removeMediator = function(mediatorName)
    {
        var mediator = this.mediatorMap[mediatorName];
        if (mediator)
        {
            // for every notification the mediator is interested in...
            var interests = mediator.listNotificationInterests();
            for (var i = 0; i < interests.length; i++)
            {
                // remove the observer linking the mediator to the notification
                // interest
                this.removeObserver(interests[i], mediator);
            }

            // remove the mediator from the map
            delete this.mediatorMap[mediatorName];

            // alert the mediator that it has been removed
            mediator.onRemove();
        }

        return mediator;
    };

    View.prototype.hasMediator = function(mediatorName)
    {
        return this.mediatorMap[mediatorName] != null;
    };

    View.prototype.facade = null;
    View.prototype.mediatorMap = null;
    View.prototype.observerMap = null;

    /***
     *       _____             .___     .__   
     *      /     \   ____   __| _/____ |  |  
     *     /  \ /  \ /  _ \ / __ |/ __ \|  |  
     *    /    Y    (  <_> ) /_/ \  ___/|  |__
     *    \____|__  /\____/\____ |\___  >____/
     *            \/            \/    \/      
     */
    function Model() {
        this.proxyMap = [];
        this.ressources = {};
    }

    Model.prototype.registerProxy = function(proxy)
    {
        proxy.facade = this.facade;
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    };

    Model.prototype.retrieveProxy = function(proxyName)
    {
        return this.proxyMap[proxyName];
    };

    Model.prototype.hasProxy = function(proxyName)
    {
        return this.proxyMap[proxyName] != null;
    };

    Model.prototype.removeProxy = function(proxyName)
    {
        var proxy = this.proxyMap[proxyName];
        if (proxy)
        {
            this.proxyMap[proxyName] = null;
            proxy.onRemove();
        }

        return proxy;
    };

    Model.prototype.facade = null;
    Model.prototype.proxyMap = null;
    Model.prototype.ressources = null;

    /***
     *    _________                __                .__  .__                
     *    \_   ___ \  ____   _____/  |________  ____ |  | |  |   ___________ 
     *    /    \  \/ /  _ \ /    \   __\_  __ \/  _ \|  | |  | _/ __ \_  __ \
     *    \     \___(  <_> )   |  \  |  |  | \(  <_> )  |_|  |_\  ___/|  | \/
     *     \______  /\____/|___|  /__|  |__|   \____/|____/____/\___  >__|   
     *            \/            \/                                  \/       
     */
    function Controller( )
    {
        this.commandMap = [];
        this.processor = new Processor();
        this.sequencer = new Sequencer();
        this.eventHandler = new EventHandler();
    }

    Controller.prototype.executeCommand = function(note)
    {
        var commandClassRef = this.commandMap[note.getName()];
        if (commandClassRef == null)
            return;

        var commandInstance = new commandClassRef(note);
        commandInstance.facade = this.facade;
        commandInstance.notification = note;
        commandInstance.execute(note);
    };

    Controller.prototype.registerCommand = function(notificationName, commandClassRef)
    {
        if (this.commandMap[notificationName] == null)
        {
            this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
        }

        this.commandMap[notificationName] = commandClassRef;
    };

    Controller.prototype.hasCommand = function(notificationName)
    {
        return this.commandMap[notificationName] != null;
    };

    Controller.prototype.removeCommand = function(notificationName)
    {
        if (this.hasCommand(notificationName))
        {
            this.view.removeObserver(notificationName, this);
            this.commandMap[notificationName] = null;
        }
    };

    Controller.prototype.facade = null;
    Controller.prototype.view = null;
    Controller.prototype.commandMap = null;
    Controller.prototype.processor = null;
    Controller.prototype.sequencer = null;
    Controller.prototype.eventHandler = null;

    /***
     *       _____ ___.             __                        __ ___________                         .___      
     *      /  _  \\_ |__   _______/  |_____________    _____/  |\_   _____/____    ____ _____     __| _/____  
     *     /  /_\  \| __ \ /  ___/\   __\_  __ \__  \ _/ ___\   __\    __) \__  \ _/ ___\\__  \   / __ |/ __ \ 
     *    /    |    \ \_\ \\___ \  |  |  |  | \// __ \\  \___|  | |     \   / __ \\  \___ / __ \_/ /_/ \  ___/ 
     *    \____|__  /___  /____  > |__|  |__|  (____  /\___  >__| \___  /  (____  /\___  >____  /\____ |\___  >
     *            \/    \/     \/                   \/     \/         \/        \/     \/     \/      \/    \/ 
     */
    function AbstractFacade( )
    {
        this._initializeFacade(  );
    }

    AbstractFacade.prototype.log = function(obj)
    {
        AbstractFacade.log(obj);
    };

    AbstractFacade.prototype.goTo = function(label, body, type)
    {
        this.controller.sequencer.goTo(label, body, type);
    };

// Event Handler
    AbstractFacade.prototype.registerEventHandler = function(labelOrName, element, event, note, useCapture, stopPropagation)
    {
        this.controller.eventHandler.registerEventHandler(labelOrName, element, event, note, useCapture, stopPropagation);
    };

    AbstractFacade.prototype.removeEventHandler = function(labelOrName)
    {
        this.controller.eventHandler.removeEventHandler(labelOrName);
    };  
// Animation Frame JOB
    AbstractFacade.prototype.registerAnimationFrameJob = function(labelOrName, note)
    {
        this.controller.sequencer.registerAnimationFrameJob(labelOrName, note);
    };
    AbstractFacade.prototype.startAnimationFrameJob = function(labelOrName)
    {
        this.controller.sequencer.startAnimationFrameJob(labelOrName);
    };
    AbstractFacade.prototype.stopAnimationFrameJob = function(labelOrName, andDestroy)
    {
        this.controller.sequencer.stopAnimationFrameJob(labelOrName, andDestroy);
    };
    AbstractFacade.prototype.stopAllAnimationFrameJob = function(andDestroy)
    {
        this.controller.sequencer.stopAllAnimationFrameJob(andDestroy);
    };

// CRON JOB
    AbstractFacade.prototype.registerCronJob = function(labelOrName, delay, note, stopCount)
    {
        this.controller.sequencer.registerCronJob(labelOrName, delay, note, stopCount);
    };
    AbstractFacade.prototype.startCronJob = function(labelOrName)
    {
        this.controller.sequencer.startCronJob(labelOrName);
    };
    AbstractFacade.prototype.stopCronJob = function(labelOrName, andDestroy)
    {
        this.controller.sequencer.stopCronJob(labelOrName, andDestroy);
    };
    AbstractFacade.prototype.stopAllCronJob = function(andDestroy)
    {
        this.controller.sequencer.stopAllCronJob(andDestroy);
    };

    AbstractFacade.prototype.getRessource = function(name)
    {
        return this.model.ressources[name];
    };

    AbstractFacade.prototype.setRessource = function(name, obj)
    {
        this.model.ressources[name] = obj;
    };

    AbstractFacade.prototype._initializeFacade = function()
    {
        this.view = new View();
        this.controller = new Controller();
        this.model = new Model();

        this.view.facade = this;
        this.controller.facade = this;
        this.controller.view = this.view;
        this.controller.processor.facade = this;
        this.controller.sequencer.facade = this;
        this.controller.eventHandler.facade = this;
        this.model.facade = this;

        this.stackMode = false;
        this.stack = [];

        this.servicesMap = {};

    };

    AbstractFacade.prototype.init = function(configObject)
    {
        this.initProxies(configObject);
        this.initMediators(configObject);
        this.initCommands(configObject);
        this.initProcesses(configObject);
        this.initServices(configObject);
        this.initHandlers(configObject);
        this.initSequences(configObject);
        this.bootstrap(configObject);
    };

    AbstractFacade.prototype.initProxies = function(configObject) {
    };
    AbstractFacade.prototype.initMediators = function(configObject) {
    };
    AbstractFacade.prototype.initCommands = function(configObject) {
    };
    AbstractFacade.prototype.initProcesses = function(configObject) {
    };
    AbstractFacade.prototype.initServices = function(configObject) {
    };
    AbstractFacade.prototype.initHandlers = function(configObject) {
    };
    AbstractFacade.prototype.initSequences = function(configObject) {
    };
    AbstractFacade.prototype.bootstrap = function(configObject) {
    };

// SERVICES
    AbstractFacade.prototype.registerService = function(name, serviceClass, configObject)
    {
        if (!this.servicesMap.hasOwnProperty(name))
        {
            this.servicesMap[ name ] = new serviceClass(this, name, configObject);
            this.log('Service ' + name + ' has been added to your Application');
        }
    };

    AbstractFacade.prototype.removeService = function(name)
    {
        if (this.servicesMap.hasOwnProperty(name))
        {
            this.servicesMap[ name ].removeService();
            delete this.servicesMap[ name ];
        }
    };

//PROCESSOR SHORT CUTS
    AbstractFacade.prototype.registerProcess = function(processName, tasksArray)
    {
        this.controller.processor.registerProcess(processName, tasksArray);
    };

    AbstractFacade.prototype.removeProcess = function(processName)
    {
        this.controller.processor.removeProcess(processName);
    };

    AbstractFacade.prototype.execute = function(processName, body, type)
    {
        this.controller.processor.execute(processName, body, type);
    };

    AbstractFacade.prototype.nextCommand = function(notification)
    {
        this.controller.processor.nextCommand(notification);
    };

// CONTROLLER SHORT CUTS
    AbstractFacade.prototype.registerCommand = function(notificationName, commandClassRef)
    {
        this.controller.registerCommand(notificationName, commandClassRef);
    };

    AbstractFacade.prototype.removeCommand = function(notificationName)
    {
        this.controller.removeCommand(notificationName);
    };

    AbstractFacade.prototype.hasCommand = function(notificationName)
    {
        return this.controller.hasCommand(notificationName);
    };

// MODEL SHORT CUTS
    AbstractFacade.prototype.registerProxy = function(proxy)
    {
        this.model.registerProxy(proxy);
    };

    AbstractFacade.prototype.retrieveProxy = function(proxyName)
    {
        return this.model.retrieveProxy(proxyName);
    };

    AbstractFacade.prototype.removeProxy = function(proxyName)
    {
        var proxy = null;
        if (this.model != null)
        {
            proxy = this.model.removeProxy(proxyName);
        }

        return proxy;
    };

    AbstractFacade.prototype.hasProxy = function(proxyName)
    {
        return this.model.hasProxy(proxyName);
    };

// VIEW SHORT CUTS
    AbstractFacade.prototype.registerMediator = function(mediator)
    {
        if (this.view != null)
        {
            this.view.registerMediator(mediator);
            this.log('Mediator ' + mediator.mediatorName + ' has been registered');
        }
    };

    AbstractFacade.prototype.retrieveMediator = function(mediatorName)
    {
        return this.view.retrieveMediator(mediatorName);
    };

    AbstractFacade.prototype.removeMediator = function(mediatorName)
    {
        var mediator = null;
        if (this.view != null)
        {
            mediator = this.view.removeMediator(mediatorName);
        }

        return mediator;
    };

    AbstractFacade.prototype.hasMediator = function(mediatorName)
    {
        return this.view.hasMediator(mediatorName);
    };

    AbstractFacade.prototype.sendNotification = function(notificationName, body, type, header)
    {
        this.stack.push(new Notification(notificationName, body, type, header));
        this.flushStack();
    };

    AbstractFacade.prototype.flushStack = function()
    {
        if (this.stack.length == 0)
            return;

        if (this.isStackMode)
        {
            setTimeout(this.flushStack, 300);

        } else {
            var note = this.stack.shift();
            //this.log('facade send notification: ' + note.name);
            this.notifyObservers(note);
            if (this.stack.length > 0)
                setTimeout(this.flushStack, 300);
        }
    };

    AbstractFacade.prototype.notifyObservers = function(notification)
    {
        if (this.view != null)
        {
            this.view.notifyObservers(notification);
        }
    };

    AbstractFacade.prototype.view = null;
    AbstractFacade.prototype.controller = null;
    AbstractFacade.prototype.model = null;
    AbstractFacade.prototype.stackMode = null;
    AbstractFacade.prototype.stack = null;
    AbstractFacade.prototype.servicesMap = null;

    AbstractFacade.log = function(obj)
    {
        if (AbstractFacade.isDebug) {
            if ("console" in window && typeof console == "object") {
                console.log(obj);
            }
        }
    }

    AbstractFacade.isDebug = true;

    /***
     *     ____ ___   __  .__.__          
     *    |    |   \_/  |_|__|  |   ______
     *    |    |   /\   __\  |  |  /  ___/
     *    |    |  /  |  | |  |  |__\___ \ 
     *    |______/   |__| |__|____/____  >
     *                                 \/ 
     */
    function log(obj)
    {
        for (n = 0; n < arguments.length; n++)
            AbstractFacade.log(arguments[n]);
    }

    function setDebug(bool)
    {
        AbstractFacade.isDebug = bool;
    }

    scope.better = {
        AbstractProxy: AbstractProxy,
        AbstractMediator: AbstractMediator,
        AbstractCommand: AbstractCommand,
        AbstractFacade: AbstractFacade,
        AbstractService: AbstractService,
        Notification: Notification,
        log: log,
        setDebug: setDebug
    };


})(this); // the 'this' parameter will resolve to global scope in all environments