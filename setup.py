# -*- coding: utf-8 -*-
"""`collaboratory_sphinx_theme`
"""
from setuptools import setup
from collaboratory_sphinx_theme import __version__

import os

directory = os.path.abspath(os.path.dirname(__file__))

setup(
    name='collaboratory_sphinx_theme',
    version=__version__,
    url='https://github.com/HumanBrainProject/hbp-collaboratory-sphinx-theme',
    license='MIT',
    author='Olivier Amblet',
    author_email='olivier.amblet@epfl.ch',
    description='Collaboratory theme for Sphinx, 2015 version.',
    long_description=open(os.path.join(directory, 'README.rst')).read(),
    zip_safe=False,
    packages=['collaboratory_sphinx_theme'],
    package_data={'collaboratory_sphinx_theme': [
        'theme.conf',
        '**/*.html',
        'static/**/*.*',
    ]},
    include_package_data=True,
    install_requires=open('requirements.txt').read().splitlines(),
)
