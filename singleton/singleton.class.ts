class Singleton{

private static instance:Singleton;

private constructor(){}

public static getInstance(){
    if(!Singleton.instance){
        Singleton.instance = new Singleton();
    }
    return Singleton.instance;
}
    myMethod(){
        console.log("hola mundo");
        
    }

    suma(a:number,b:number){
        return a+b
    }
}
const MyClass = Singleton.getInstance();
MyClass.myMethod()
const MyClass1 = Singleton.getInstance();
MyClass.suma(1,2)
