// Design Patterns in JavaScript
// Common design patterns and their implementations

// Method 1: Singleton Pattern
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        this.data = [];
    }
    
    addItem(item) {
        this.data.push(item);
    }
    
    getItems() {
        return [...this.data];
    }
    
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

// Method 2: Factory Pattern
class VehicleFactory {
    static createVehicle(type, options = {}) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car(options);
            case 'motorcycle':
                return new Motorcycle(options);
            case 'truck':
                return new Truck(options);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

class Car {
    constructor(options) {
        this.type = 'Car';
        this.wheels = 4;
        this.engine = options.engine || 'V6';
    }
}

class Motorcycle {
    constructor(options) {
        this.type = 'Motorcycle';
        this.wheels = 2;
        this.engine = options.engine || 'V2';
    }
}

class Truck {
    constructor(options) {
        this.type = 'Truck';
        this.wheels = 6;
        this.engine = options.engine || 'V8';
    }
}

// Method 3: Observer Pattern
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
    
    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    }
}

// Method 4: Strategy Pattern
class PaymentStrategy {
    pay(amount) {
        throw new Error('pay method must be implemented');
    }
}

class CreditCardPayment extends PaymentStrategy {
    pay(amount) {
        return `Paid $${amount} using Credit Card`;
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        return `Paid $${amount} using PayPal`;
    }
}

class BitcoinPayment extends PaymentStrategy {
    pay(amount) {
        return `Paid $${amount} using Bitcoin`;
    }
}

class PaymentProcessor {
    constructor() {
        this.strategy = null;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        if (!this.strategy) {
            throw new Error('Payment strategy not set');
        }
        return this.strategy.pay(amount);
    }
}

// Method 5: Command Pattern
class Command {
    execute() {
        throw new Error('execute method must be implemented');
    }
    
    undo() {
        throw new Error('undo method must be implemented');
    }
}

class LightOnCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }
    
    execute() {
        this.light.turnOn();
    }
    
    undo() {
        this.light.turnOff();
    }
}

class LightOffCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }
    
    execute() {
        this.light.turnOff();
    }
    
    undo() {
        this.light.turnOn();
    }
}

class Light {
    constructor() {
        this.isOn = false;
    }
    
    turnOn() {
        this.isOn = true;
        console.log('Light is ON');
    }
    
    turnOff() {
        this.isOn = false;
        console.log('Light is OFF');
    }
}

class RemoteControl {
    constructor() {
        this.commands = [];
        this.undoStack = [];
    }
    
    setCommand(command) {
        this.commands.push(command);
    }
    
    pressButton(index) {
        if (index < this.commands.length) {
            const command = this.commands[index];
            command.execute();
            this.undoStack.push(command);
        }
    }
    
    undo() {
        if (this.undoStack.length > 0) {
            const command = this.undoStack.pop();
            command.undo();
        }
    }
}

// Method 6: Decorator Pattern
class Coffee {
    cost() {
        return 5;
    }
    
    description() {
        return 'Simple coffee';
    }
}

class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost();
    }
    
    description() {
        return this.coffee.description();
    }
}

class MilkDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 2;
    }
    
    description() {
        return this.coffee.description() + ', milk';
    }
}

class SugarDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 1;
    }
    
    description() {
        return this.coffee.description() + ', sugar';
    }
}

// Method 7: Adapter Pattern
class OldAPI {
    request() {
        return 'data from old API';
    }
}

class NewAPI {
    fetch() {
        return 'data from new API';
    }
}

class APIAdapter {
    constructor(api) {
        this.api = api;
    }
    
    request() {
        if (this.api.fetch) {
            return this.api.fetch();
        }
        return this.api.request();
    }
}

// Method 8: Facade Pattern
class SubsystemA {
    operationA() {
        return 'Subsystem A operation';
    }
}

class SubsystemB {
    operationB() {
        return 'Subsystem B operation';
    }
}

class SubsystemC {
    operationC() {
        return 'Subsystem C operation';
    }
}

class Facade {
    constructor() {
        this.subsystemA = new SubsystemA();
        this.subsystemB = new SubsystemB();
        this.subsystemC = new SubsystemC();
    }
    
    operation() {
        const resultA = this.subsystemA.operationA();
        const resultB = this.subsystemB.operationB();
        const resultC = this.subsystemC.operationC();
        
        return `${resultA}, ${resultB}, ${resultC}`;
    }
}

// Method 9: Proxy Pattern
class RealImage {
    constructor(filename) {
        this.filename = filename;
        this.loadFromDisk();
    }
    
    loadFromDisk() {
        console.log(`Loading ${this.filename} from disk`);
    }
    
    display() {
        console.log(`Displaying ${this.filename}`);
    }
}

class ProxyImage {
    constructor(filename) {
        this.filename = filename;
        this.realImage = null;
    }
    
    display() {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filename);
        }
        this.realImage.display();
    }
}

// Method 10: Chain of Responsibility Pattern
class Handler {
    constructor() {
        this.next = null;
    }
    
    setNext(handler) {
        this.next = handler;
        return handler;
    }
    
    handle(request) {
        if (this.next) {
            return this.next.handle(request);
        }
        return null;
    }
}

class ConcreteHandlerA extends Handler {
    handle(request) {
        if (request.type === 'A') {
            return `Handled by A: ${request.data}`;
        }
        return super.handle(request);
    }
}

class ConcreteHandlerB extends Handler {
    handle(request) {
        if (request.type === 'B') {
            return `Handled by B: ${request.data}`;
        }
        return super.handle(request);
    }
}

class ConcreteHandlerC extends Handler {
    handle(request) {
        if (request.type === 'C') {
            return `Handled by C: ${request.data}`;
        }
        return super.handle(request);
    }
}

// Method 11: Template Method Pattern
class DataMiner {
    extractData() {
        const rawData = this.extractRawData();
        const parsedData = this.parseData(rawData);
        const analyzedData = this.analyzeData(parsedData);
        const report = this.generateReport(analyzedData);
        this.sendReport(report);
    }
    
    extractRawData() {
        throw new Error('extractRawData must be implemented');
    }
    
    parseData(data) {
        throw new Error('parseData must be implemented');
    }
    
    analyzeData(data) {
        throw new Error('analyzeData must be implemented');
    }
    
    generateReport(data) {
        throw new Error('generateReport must be implemented');
    }
    
    sendReport(report) {
        console.log('Sending report:', report);
    }
}

class PDFDataMiner extends DataMiner {
    extractRawData() {
        return 'PDF raw data';
    }
    
    parseData(data) {
        return `Parsed ${data}`;
    }
    
    analyzeData(data) {
        return `Analyzed ${data}`;
    }
    
    generateReport(data) {
        return `PDF Report: ${data}`;
    }
}

class CSVDataMiner extends DataMiner {
    extractRawData() {
        return 'CSV raw data';
    }
    
    parseData(data) {
        return `Parsed ${data}`;
    }
    
    analyzeData(data) {
        return `Analyzed ${data}`;
    }
    
    generateReport(data) {
        return `CSV Report: ${data}`;
    }
}

// Method 12: State Pattern
class State {
    handle(context) {
        throw new Error('handle method must be implemented');
    }
}

class ConcreteStateA extends State {
    handle(context) {
        console.log('State A handling');
        context.setState(new ConcreteStateB());
    }
}

class ConcreteStateB extends State {
    handle(context) {
        console.log('State B handling');
        context.setState(new ConcreteStateA());
    }
}

class Context {
    constructor() {
        this.state = new ConcreteStateA();
    }
    
    setState(state) {
        this.state = state;
    }
    
    request() {
        this.state.handle(this);
    }
}

// Method 13: Builder Pattern
class ComputerBuilder {
    constructor() {
        this.computer = new Computer();
    }
    
    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this;
    }
    
    setRAM(ram) {
        this.computer.ram = ram;
        return this;
    }
    
    setStorage(storage) {
        this.computer.storage = storage;
        return this;
    }
    
    setGPU(gpu) {
        this.computer.gpu = gpu;
        return this;
    }
    
    build() {
        return this.computer;
    }
}

class Computer {
    constructor() {
        this.cpu = '';
        this.ram = '';
        this.storage = '';
        this.gpu = '';
    }
    
    toString() {
        return `Computer: CPU=${this.cpu}, RAM=${this.ram}, Storage=${this.storage}, GPU=${this.gpu}`;
    }
}

// Method 14: Prototype Pattern
class Prototype {
    clone() {
        return Object.create(this);
    }
}

class Document extends Prototype {
    constructor(content) {
        super();
        this.content = content;
    }
    
    clone() {
        const cloned = super.clone();
        cloned.content = this.content;
        return cloned;
    }
}

// Method 15: Flyweight Pattern
class FlyweightFactory {
    constructor() {
        this.flyweights = {};
    }
    
    getFlyweight(key) {
        if (!this.flyweights[key]) {
            this.flyweights[key] = new ConcreteFlyweight(key);
        }
        return this.flyweights[key];
    }
    
    getCount() {
        return Object.keys(this.flyweights).length;
    }
}

class ConcreteFlyweight {
    constructor(intrinsicState) {
        this.intrinsicState = intrinsicState;
    }
    
    operation(extrinsicState) {
        return `Flyweight: ${this.intrinsicState}, Extrinsic: ${extrinsicState}`;
    }
}

// Real-world examples

// Example 1: Singleton usage
const singleton1 = new Singleton();
const singleton2 = new Singleton();
console.log(singleton1 === singleton2); // true

singleton1.addItem('item1');
console.log(singleton2.getItems()); // ['item1']

// Example 2: Factory pattern usage
const car = VehicleFactory.createVehicle('car', { engine: 'V8' });
const motorcycle = VehicleFactory.createVehicle('motorcycle', { engine: 'V4' });
console.log(car.type, car.wheels); // Car 4
console.log(motorcycle.type, motorcycle.wheels); // Motorcycle 2

// Example 3: Observer pattern usage
const emitter = new EventEmitter();
emitter.on('userLogin', (user) => {
    console.log('User logged in:', user);
});
emitter.emit('userLogin', { name: 'John', id: 1 });

// Example 4: Strategy pattern usage
const processor = new PaymentProcessor();
processor.setStrategy(new CreditCardPayment());
console.log(processor.processPayment(100)); // Paid $100 using Credit Card

processor.setStrategy(new PayPalPayment());
console.log(processor.processPayment(50)); // Paid $50 using PayPal

// Example 5: Command pattern usage
const light = new Light();
const remote = new RemoteControl();

remote.setCommand(new LightOnCommand(light));
remote.setCommand(new LightOffCommand(light));

remote.pressButton(0); // Light is ON
remote.pressButton(1); // Light is OFF
remote.undo(); // Light is ON

// Example 6: Decorator pattern usage
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.cost()); // 8
console.log(coffee.description()); // Simple coffee, milk, sugar

// Example 7: Adapter pattern usage
const oldAPI = new OldAPI();
const newAPI = new NewAPI();

const adapter1 = new APIAdapter(oldAPI);
const adapter2 = new APIAdapter(newAPI);

console.log(adapter1.request()); // data from old API
console.log(adapter2.request()); // data from new API

// Example 8: Facade pattern usage
const facade = new Facade();
console.log(facade.operation()); // Subsystem A operation, Subsystem B operation, Subsystem C operation

// Example 9: Proxy pattern usage
const image = new ProxyImage('test.jpg');
image.display(); // Loading test.jpg from disk, Displaying test.jpg
image.display(); // Displaying test.jpg (no loading)

// Example 10: Chain of Responsibility usage
const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();
const handlerC = new ConcreteHandlerC();

handlerA.setNext(handlerB).setNext(handlerC);

console.log(handlerA.handle({ type: 'A', data: 'test' })); // Handled by A: test
console.log(handlerA.handle({ type: 'B', data: 'test' })); // Handled by B: test
console.log(handlerA.handle({ type: 'C', data: 'test' })); // Handled by C: test

// Example 11: Template Method usage
const pdfMiner = new PDFDataMiner();
const csvMiner = new CSVDataMiner();

pdfMiner.extractData();
csvMiner.extractData();

// Example 12: State pattern usage
const context = new Context();
context.request(); // State A handling
context.request(); // State B handling
context.request(); // State A handling

// Example 13: Builder pattern usage
const computer = new ComputerBuilder()
    .setCPU('Intel i7')
    .setRAM('16GB')
    .setStorage('1TB SSD')
    .setGPU('RTX 3080')
    .build();

console.log(computer.toString());

// Example 14: Prototype pattern usage
const originalDoc = new Document('Hello World');
const clonedDoc = originalDoc.clone();
console.log(clonedDoc.content); // Hello World

// Example 15: Flyweight pattern usage
const factory = new FlyweightFactory();
const flyweight1 = factory.getFlyweight('shared');
const flyweight2 = factory.getFlyweight('shared');

console.log(flyweight1.operation('state1')); // Flyweight: shared, Extrinsic: state1
console.log(flyweight2.operation('state2')); // Flyweight: shared, Extrinsic: state2
console.log(factory.getCount()); // 1 (only one flyweight created)

// Export for testing
module.exports = {
    Singleton,
    VehicleFactory,
    Car,
    Motorcycle,
    Truck,
    EventEmitter,
    PaymentStrategy,
    CreditCardPayment,
    PayPalPayment,
    BitcoinPayment,
    PaymentProcessor,
    Command,
    LightOnCommand,
    LightOffCommand,
    Light,
    RemoteControl,
    Coffee,
    CoffeeDecorator,
    MilkDecorator,
    SugarDecorator,
    OldAPI,
    NewAPI,
    APIAdapter,
    SubsystemA,
    SubsystemB,
    SubsystemC,
    Facade,
    RealImage,
    ProxyImage,
    Handler,
    ConcreteHandlerA,
    ConcreteHandlerB,
    ConcreteHandlerC,
    DataMiner,
    PDFDataMiner,
    CSVDataMiner,
    State,
    ConcreteStateA,
    ConcreteStateB,
    Context,
    ComputerBuilder,
    Computer,
    Prototype,
    Document,
    FlyweightFactory,
    ConcreteFlyweight
}; 