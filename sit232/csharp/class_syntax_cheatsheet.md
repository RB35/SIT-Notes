# Class syntax cheatsheet
Maybe you haven't used C# in a while and need a quick refresher. If so this is for you!
## Class
![C# class boilerplate](./assets/class_template.svg){width=400px}

---

<span style="color:#e81313">**Access Modifiers**</span>
* `public` - Can be accessed from anywhere
* `private` - Can only be accessed from within this same class
* `protected` - Can be only accessed from it's own class or derived classes.

---

<span style="color:#1071e5">**Types**</span>

The type can be any value type this could be a built-in type or a custom class or data structure.

Common built-in types include:
* `int`
* `bool`
* `double`
* `string`

A full list of built-in types can be found [here](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types)

---

<span style="color:#008a0e">**Return Types**</span>

The return type is the type which is returned by the method. This can be any value type or `void` if the method returns nothing.

---

### Constructor
![C# class boilerplate](./assets/class_template_constructor.svg){width=400px}

The constructor is the method called to create an object of a class. It can take arguments and used to setup the class.