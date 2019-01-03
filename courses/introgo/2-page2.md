---
path: "/courses/introgo/gettingstarted"
title: "Getting Started with Go"
order: 1
videoid:  "309130727"

---


## Introduction

Brian Ketelsen - brian@gopher.rocks

- [@bketelsen](https://twitter.com/bketelsen) 
- https://github.com/bketelsen
- https://brianketelsen.com
- https://gophercon.com
- https://blog.gopheracademy.com
- http://www.goinactionbook.com/

## Installing Go 

### Mac or Linux

Download and install Go - always use the packages from golang.org - never use homebrew or apt-get, yum, etc. They're broken, or worse -- modified by someone upstream.

Set a GOPATH in .bashrc, .bash_profile, .zshrc etc:

	export GOPATH=$HOME/go

Add go binaries (compilers and tools) to your path:

	export PATH=$PATH:/usr/local/go/bin

Log out and back in to get the changes or

	$ source .bashrc

to hot-reload.


### Windows

Download and install Go - Use MSI installer

Set a GOPATH in user Environment Variables

	GOPATH=%userdir%/go

Add go binaries (compilers and tools) to your path:

	%userdir%/go/bin	

## Verify Installation

From a command prompt:
	
	go version

You should see something like:

	go version 1.11 linux/amd64

## Download Course Material

Now that you have a Go development environment set up, download the course material for this class:

	go get -u gopher.rocks/source

## Test your setup

	cd $GOPATH/src/gopher.rocks/source/introgo/exercises/hello
	go run main.go

You should see:

	hello world!

Nothing like starting with the classics :)


## Editing Go Code

Popular Go Editors:

vim and neovim with vim-go plugin 

emacs with go-mode.el

Visual Studio Code with vscode-go (works with debugging!) 

Atom with go-plus

IntelliJ IDEA with Go plugin

## Before You Get Too Deep

Pick your favorite editor and configure it for Go development.

https://github.com/fatih/vim-go-tutorial (vim)

http://tleyden.github.io/blog/2014/05/22/configure... (emacs)

http://marcio.io/2015/07/supercharging-atom-editor... (atom)

https://github.com/Microsoft/vscode-go (VS Code)


## The Go Playground

Even if you don't have an editor configured locally you can still play with Go from your browser.

[The Go Playground](https://play.golang.org)

The Go Playground is a web service that runs on golang.org's servers. The service receives a Go program, compiles, links, and runs the program inside a sandbox, then returns the output.

## Playground Limitations

There are limitations to the programs that can be run in the playground:

The playground can use most of the standard library, with some exceptions. The only communication a playground program has to the outside world is by writing to standard output and standard error.

In the playground the time begins at 2009-11-10 23:00:00 UTC (determining the significance of this date is an exercise for the reader). This makes it easier to cache programs by giving them deterministic output.

There are also limits on execution time and on CPU and memory usage. Therefore: No file IO, nothing useful with time or dates, can't use any external packages.

Even with all those limitations Go developers love the Go Playground - it's a great place to share code, even if it can't run or compile. You can enter code then click the "SHARE" button which will give you a permanent URL to that code.

Try it now with this link: 

[Hello World](https://play.golang.org/p/992fMmkkxr)

In this course we will use Playground links to show runnable code sometimes, but most of the material will be in the repository on [gopher.rocks](https://github.com/bketelsen/lessons).

## The Go Command

All of your command line interaction with Go will be through the `go` command.

Several common commands:
	
	go build some/package
	go run main.go
	go test some/package
	go get github.com/someone/package
	go install some/package

## Exercise

From the command prompt type `go` and hit return to see the various tools the `go` command implements.  Try some like:

	go env
	go list
	go version

## Before Moving On

- Make sure your `go` command works
- Make sure you can run the "hello world" example above

## Need Help?

There are a lot of great resources available for you if you get stuck along the way.  The Go community is generally really friendly and helpful for programmers of all skill levels.  Don't be shy, and don't stay stuck too long.  Try these places if you have a question:

- Gopher Slack
- Other
- Other