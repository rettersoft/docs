---
title: Getting Started
pageTitle: Retter.io - Faster Backend Development
description: Enabling developers to write backend apps with Retter.io
---

Retter.io *(Rio)* is an abstraction on top of cloud infrastructure.
Basically instead of writing apps directly running on AWS, you write apps running on Rio.
Rio runs on AWS.

We like to call Rio a cloud operating system managing the resources of cloud computer (AWS).
Nobody writes apps directly accessing Intel chip.
There is always an operating system in between like Windows, MacOS or Linux.
Writing an application on top of Windows is much faster and easier compared to directly using the underlying hardware.
Also there are many high level components you can use like UI components etc.
With Rio we aim to give developers the ease of use of an operating system.

There are some apps like realtime gaming, you cannot use Rio.
These may require very low level networking components etc.
However if you like to write an Internet scale cloud app for retail for instance, Rio gives you speed and ease of use.

We have created Rio for our internal use in Retter while writing custom software for our clients.
Now, we can use Rio to deliver cloud software up to 10x faster than directly using AWS.

{% link-grid %}

{% link-grid-link title="Projects" icon="installation" href="/docs/projects/the-concept"
    description="Projects are simply applications running on your Rio operating system." /%}

{% link-grid-link title="Classes" icon="presets" href="/docs/classes/the-concept"
    description="Classes are basic building blocks in Rio." /%}

{% link-grid-link title="Methods" icon="theming" href="/docs/methods/the-concept"
    description="Methods are places that you put your business logic and implementations." /%}

{% link-grid-link title="Operations" icon="plugins" href="/docs/operations/the-concept"
    description="Operations are built-in services available via our API called RDK." /%}

{% /link-grid %}

## Underlying Technology

Rio is running completely serverlessly on AWS.
We use Lambda, DynamoDB, S3, Kinesis, SNS, Event Bridge etc in the background.
However anyone using Rio doesn't have to have any experience on these services.
Rio handles everything seamlessly.

## Design Patterns

Serverless + NoSQL databases gave us a development pattern which we think is object oriented.
A set of lambda functions are running and reading and writing to a partition in a NoSQL db.
We have created Rio to handle this scenario, so the developer doesn't have to.
Rio takes care of following three things:

- Object state handling
- Single concurrency execution for each object instance
- Realtime streaming of instance state updates to connected clients

We are yet to publish best practice documents.
You can follow us on twitter.
