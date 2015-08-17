.. _collaboratory: https://collab.humanbrainproject.eu
.. _bower: http://www.bower.io
.. _sphinx: http://www.sphinx-doc.org
.. _sass: http://www.sass-lang.com
.. _wyrm: http://www.github.com/snide/wyrm/
.. _grunt: http://www.gruntjs.com
.. _node: http://www.nodejs.com
.. _demo: https://collab.humanbrainproject.eu/#/collab/54/nav/368
.. _repository: https://github.com/HumanBrainProject/hbp-collaboratory-sphinx-theme
.. _release: https://github.com/HumanBrainProject/hbp-collaboratory-sphinx-theme/releases/latest
.. _documentation example: https://github.com/HumanBrainProject/hbp-collaboratory-doc-example

.. image:: https://travis-ci.org/HumanBrainProject/hbp-collaboratory-sphinx-theme.svg?branch=master
    :target: https://travis-ci.org/HumanBrainProject/hbp-collaboratory-sphinx-theme

******************************
HBP Collaboratory Sphinx Theme
******************************

.. contents::

View a working demo_ over on collaboratory_.

This package provide a Sphinx theme for documentation integrated into the
Collaboratory. It can be used for standalone websites as well.

.. image:: screen_integrated.png
    :width: 100%

Installation
============

Download the ``hbp-collaboratory-sphinx-theme.zip`` provided by the latest release_
to your documentation project directory.

As explained in `sphinx documentation`__, in your ``conf.py`` file:

__ http://sphinx-doc.org/theming.html#using-a-theme

.. code:: python

    html_theme = 'hbp-collaboratory-sphinx-theme'
    html_theme_path = ['.']

Contributing or modifying the theme
===================================

HBP Collaboratory Sphinx Theme github project can be included in your documentation
project as a git submodule. This will enable you to modify the theme and see the
changes immediately in your browser. Please have a look at the `documentation example`_
project on how to set up. After you are happy with the changes, you've made to the theme,
please make a pull request for us to review.

Build and release the theme
===========================

The build and release is done using grunt.

.. code:: bash

    grunt release

`Changelog`__

__ CHANGELOG.md
