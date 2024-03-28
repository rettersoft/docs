---
title: Getting Started
pageTitle: Retter.io - Faster Backend Development
description: Enabling developers to write backend apps with Retter.io
---

Retter.io *(Rio)* is an abstraction layer on top of cloud infrastructure.
Basically, instead of writing apps directly running on AWS, you write apps running on Rio which runs on AWS.
We like to call Rio as a cloud operating system that manages all the necessary resources of a cloud computer (AWS).

Instead of writing an application that directly accesses the Intel chip, it is preferable to have an operating system such as Windows, MacOS or Linux.
Writing an application on top of Windows is much faster and easier compared to directly using the underlying hardware.
Additionally, there are many high level components you might use such as UI components.
The ease of use of an operating system is aimed to give to developers with the Rio.

> There are some apps such as realtime gaming that you cannot use Rio.
These may require very low level networking components etc.
For instance, if you like to write an Internet scale cloud app for retail, Rio gives you speed and ease of use.

We created Rio for our internal use in Retter while writing various mobile and web applications for our clients.
Now, we can use Rio to deliver cloud software up to 10x faster than directly using AWS.

{% link-grid %}

{% link-grid-link title="Projects" icon="installation" href="/docs/components/projects"
    description="Projects are simply applications that you run on your Rio operating system." /%}

{% link-grid-link title="Classes" icon="presets" href="/docs/components/classes"
    description="Classes are basic building blocks in Rio." /%}

{% link-grid-link title="Dependencies" icon="presets" href="/docs/components/dependencies"
    description="Dependencies provide a way to extend your default dependencies with your own custom codes." /%}

{% link-grid-link title="RDK" icon="theming" href="/docs/dk/operations"
    description="Operations are built-in services available via our API called RDK." /%}

{% link-grid-link title="SDKs" icon="theming" href="/docs/sdk/javascript"
    description="Rio has SDKs for iOS, Android, Web platforms and React Native." /%}

{% link-grid-link title="CLI" icon="plugins" href="/docs/cli/commands"
    description="Rio CLI is a nodejs program to help you create projects and deploy them." /%}

{% /link-grid %}

## Underlying Technology

Rio is running completely serverless on AWS.
We use Lambda, DynamoDB, S3, Kinesis, SNS, Event Bridge, etc. in the background.
However anyone using Rio doesn't have to have any experience on these services.
Rio handles everything seamlessly.

## Design Patterns

Serverless + NoSQL databases gave us a development pattern which we think is object oriented.
A set of lambda functions are running, reading and writing to a partition in a NoSQL database.
We have created Rio to handle this scenario, so the developer doesn't have to.
Rio takes care of following three things:

- Object state handling
- Single concurrency writes for each object instance
- Realtime streaming of instance state updates to connected clients

We are yet to publish best practice documents.
You can follow us on social media.
