ExtendedProgrammingInterface
============================
The ExtendedProgrammingInterface, or EPI for short, is a user-created library that makes interacting with both the MediaWiki API and the Wikia API less of a pain. It aims to shorten long winded and often used pieces of code into short one-line statements that make the end code both clean, compact, and easy to read. 

In order to do this the EPI leverages Promises when dealing with async calls to network resources in order to help reduce the amount and frequency of callbacks as well as to help make the code written using it easier to follow and write.

## Using
To use the EPI in your Wikia javascript project you simply need to create these two files:
 * `MyScript/import.js`
 * `MyScript/core.js`

The `core.js` file holds the actual code for the script which uses methods from the EPI while the `import.js` file holds the following code:

```javascript
importArticles({
    type:     'script',
    articles: [
        'u:dev:MediaWiki:ExtendedProgrammingInterface/core.js',
        'u:dev:MediaWiki:MyScript/core.js'
    ]
});
```

This ensures that the EPI will load before your script, giving it access to all of the methods the EPI defines.

## Developing
Currently development on the EPI is very simple. See `epi.main.js` to see how modules are structured and imported. Once you have created your module and made sure that it would be imported in the proper place simply run the following command to compile it to a simple source file.

```bash
~$ node homemade.js api.main.js epi.js
```

## Credits
 * [Homemade.js](https://github.com/dfcreative/homemade) - [Dfcreative](https://github.com/dfcreative)
 * ExtendedProgrammingInterface:
   * [らり牛ちゃん](http://dev.wikia.com/wiki/User:らり牛ちゃん) 