.. _collaboratory: https://collab.humanbrainproject.eu
.. _bower: http://www.bower.io
.. _sphinx: http://www.sphinx-doc.org
.. _sass: http://www.sass-lang.com
.. _wyrm: http://www.github.com/snide/wyrm/
.. _grunt: http://www.gruntjs.com
.. _node: http://www.nodejs.com
.. _demo: https://collab.humanbrainproject.eu/#/collab/54/nav/368
.. _repository: https://bbpcode.epfl.ch/code/#/admin/projects/platform/hbp/collaboratory-sphinx-theme

.. image:: https://travis-ci.org/genric/hbp-collaboratory-sphinx-theme.svg?branch=master
    :target: https://travis-ci.org/genric/hbp-collaboratory-sphinx-theme
    :align: right

**************************
Collaboratory Sphinx Theme
**************************

.. contents::

View a working demo_ over on collaboratory_.

This package provide a Sphinx theme for documentation integrated into the
Collaboratory. It can be used for standalone websites as well.

.. image:: screen_integrated.png
    :width: 100%

Installation
============

Via package
-----------

Download the package or add it to your ``requirements.txt`` file:

.. code:: bash

    $ pip install collaboratory_sphinx_theme -i http://bbpgb019.epfl.ch:9090/simple

In your ``conf.py`` file:

.. code:: python

    import collaboratory_sphinx_theme

    html_theme = "collaboratory_sphinx_theme"

    html_theme_path = [collaboratory_sphinx_theme.get_html_theme_path()]

Via git or download
-------------------

Symlink or subtree the repository_ into your documentation at
``docs/_themes/collaboratory_sphinx_theme`` then add the following two settings to your Sphinx
conf.py file:

.. code:: python

    html_theme = "collaboratory_sphinx_theme"
    html_theme_path = ["_themes", ]


Contributing or modifying the theme
===================================

The collaboratory_sphinx_theme is primarily a sass_ project that requires a few
other sass libraries. We are using bower_ to manage these dependencies and sass_
to build the css. The good news is I have a very nice set of grunt_ operations
that will not only load these dependecies, but watch for changes, rebuild the
sphinx demo docs and build a distributable version of the theme.
The bad news is this means you'll need to set up your environment similar to
that of a front-end developer (vs. that of a python developer). That means
installing node_.

Set up your environment
-----------------------

1. Create a virtual environment in ./venv

.. code::

    virtualenv venv

1. Install sphinx_ into a virtual environment.

.. code::

    venv/bin/pip install sphinx


2. Install node, bower and grunt.

.. code::

    // Install node
    brew install node

    // Install bower and grunt
    npm install -g bower grunt-cli

    // Now that everything is installed, let's install the theme dependecies.
    npm install

Now that our environment is set up, make sure you're in your virtual environment, go to
this repository in your terminal and run grunt:

.. code::

    grunt serve

This default task will do the following **very cool things that make it worth the trouble**.

1. It'll install and update any bower dependencies.
2. It'll run sphinx and build new docs.
3. It'll watch for changes to the sass files and build css from the changes.
4. It'll rebuild the sphinx docs anytime it notices a change to .rst, .html, .js
   or .css files.


Build and Deploy
----------------

The build is done using grunt.

.. code:: bash

    grunt ci

To deploy a new version, you need the commit rights on the gerrit repository.
Only the Continuous Integration should have them. Just pass a patch level you
want to bump to using one of ``patch``, ``minor`` or ``major``. Here, we
used ``patch``.

.. code:: bash

   grunt ci:patch


Changelog
=========

v0.1.0
------

* Start keeping changelog :)
