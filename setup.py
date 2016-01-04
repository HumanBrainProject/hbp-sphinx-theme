# -*- coding: utf-8 -*-
"""`hbp_sphinx_theme` lives on `Github`_.
.. _github: https://www.github.com/HumanBrainProject/hbp-sphinx-theme
"""
from setuptools import setup
from hbp_sphinx_theme import __version__

# This file has been adapted from
# https://github.com/snide/sphinx_rtd_theme/blob/master/setup.py

setup(
    name='hbp-sphinx-theme',
    version=__version__,
    url='https://github.com/HumanBrainProject/hbp-sphinx-theme/',
    license='MIT',
    author='Olivier Amblet',
    author_email='olivier.amblet@epfl.ch',
    description='Human Brain Project Sphinx Theme.',
    long_description=open('README.rst').read(),
    zip_safe=False,
    packages=['hbp_sphinx_theme'],
    package_data={'hbp_sphinx_theme': [
        'theme.conf',
        '*.html',
        'static/*/*.*',
    ]},
    include_package_data=True,
    install_requires=open('requirements.txt').read().splitlines(),
    classifiers=[
        'Development Status :: 3 - Alpha',
        'License :: OSI Approved :: BSD License',
        'Environment :: Console',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Operating System :: OS Independent',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
    ],
)
