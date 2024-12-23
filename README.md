# DDD (Domain-driven Design)

It is a software design methodology. A way to mantain very clear and standardized communication between all parties involved in the development of an application. 

## Domain

An are of understanding where all people involved in building the software have very similar knowledge.

- **Domain Experts:** these are the people who deeply understand the problem we are solving with our software.
  - **Conversation:** is the first thing that is very important in development of a software. From the conversation you will have more knowledge of the domain, this being the area of understanding in which you are developing software. From these conversations, a ubiquitous language will be created.
- **Ubiquitous Language:** or domain language, is an universal language in which all people involved in building that software can communicate equally.
- **Aggregates:** are entities that depend on another entity to exist and they are manipulated at the same time.
- **Domain Events:** a way to connect different use cases without coupling them together.
- **Bounded Contexts:** how we divide the domain of our application into small parts. They are divided into three types:
  - **Core:** what makes money, it can't stop;
  - **Supporting:** provides support for the core to work;
  - **Generic:** you need, but they are not that important;
- **Entities:** is everything I can understand as something that will be maintained by our user or by our application. Entities are usually found in our conversations with domain experts.
- **Use Cases:** are the verbs that I found in our conversations with domain experts.
- **Value Objects:** are properties of entities that have business rules.

## Clean Architecture

Decoupling, making each piece of code not tightly coupled to an external layer.
