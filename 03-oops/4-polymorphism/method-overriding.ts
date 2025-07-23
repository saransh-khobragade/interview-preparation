/**
 * Polymorphism - Same Method, Different Behavior
 */

class Shape {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  // Base method that will be overridden
  calculateArea(): number {
    return 0;
  }
  
  getInfo(): string {
    return `${this.name} - Area: ${this.calculateArea()}`;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;
  
  constructor(width: number, height: number) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }
  
  // Override with specific implementation
  calculateArea(): number {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  radius: number;
  
  constructor(radius: number) {
    super("Circle");
    this.radius = radius;
  }
  
  // Override with different implementation
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// Polymorphism in action
function printShapeInfo(shape: Shape): void {
  console.log(shape.getInfo()); // Same method call, different results
}

// Usage
const rectangle = new Rectangle(5, 3);
const circle = new Circle(4);

printShapeInfo(rectangle); // Rectangle - Area: 15
printShapeInfo(circle);    // Circle - Area: 50.27

// Array of different shapes
const shapes: Shape[] = [
  new Rectangle(2, 4),
  new Circle(3),
  new Rectangle(6, 2)
];

shapes.forEach(shape => printShapeInfo(shape));

export { Shape, Rectangle, Circle }; 