# Design Document

## Backstory

You own a small plot of land on a vast continent, a continent filled with hostile creatures. Your plot isn't much, but it's yours, and you've managed to eke out a living thus far while defending it from the local wildlife. However, every day you hear more and more dire tidings... Cows being eaten by wyverns, tows being ravaged by drakes, and castles being destroyed by dragons. There are even rumors of great elder dragons, ruling far-away swathes of land with claw and fire.

You know something needs to be done. And if no-one else will do it, by golly you'll do it yourself!

## Plot

Start out by hunting the local wildlife (baby wyverns) and harvest their corpses to gather resources. Use those resources to hire more experienced hunters (You yourself certainly can't take on a dragon!), who are much better at hunting/gathering resources than you. Get access to more land to increase the areas you can hunt, and access a larger variety of employees. Hire researchers to find ways to improve the efficiency of your hunters, with both mechanical and magical innovations, and allow them to hunt bigger pray. Slay great magical beasts to allow you to ascend and reincarnate, allowing you to access greater power and expand your reach even farther.

## Gameplay

As with all idle games, click a bunch at the beginning to harvest initial resources. Spend them on auto-collectors, who will harvest resources automatically, which you can spend on all kinds of things (unlocks, new collectors, etc)

## Design Principles

- Lore is important - each gameplay element links to a info page containing lore about the world.
- Low impact but consistent - the game should run consistently, even when in a background tab.
-- To support this, all operations not triggered directly by a user action should be processed in the background worker. The UI should render based on the state pushed from the worker.

## Tech Stack

Game is written in Typescript using the React library. Tests are written in Jest, and code is built using Webpack
