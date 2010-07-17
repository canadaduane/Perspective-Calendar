Perspective Calendar
====================

This project grew out of Marco Arment's "Logarithmic Calendar" blog post [1] and my own spin on the idea to make a calendar into a 3D perspective view [2].  The basic idea is simple: you care most about your near future, and less about your distant future.  That sounds an awful lot like looking down a busy street--the closer things and people are to you, the more you have to think about how to navigate through and around them.

There's a little exception to this general rule, and it goes like this: There are a handful of future events that are so important that you actually WANT to see them coming from a mile away.  For example, you may want to prepare for your final exams, anticipate your boyfriend's birthday, or worry about January 1st, 2012.

How it Works
------------

This Perspective Calendar project can be thought of as an extension to Google Calendar--it takes a public calendar feed and turns it into events that javascript can understand.  The events are then mapped to a 3D space and drawn using the Raphael JS library (scalable vector graphics).

Present & Future
----------------

Currently, events are mapped to the left-hand side of the "road" and rendered in a single color.  The events can be dragged around to different "tracks" and times, but they are not yet saved.  In other words, this is a read-only calendar view, with some support for future calendar editing possibilities.

[1] http://www.marco.org/480805355
[2] http://blog.inquirylabs.com/2010/07/12/perspective-calendar/

