# -*- coding: utf-8 -*-
"""`collaboratory_sphinx_theme`
"""
from setuptools import setup
from collaboratory_sphinx_theme import __version__

setup(
    name='collaboratory_sphinx_theme',
    version=__version__,
    url='https://bbpcode.epfl.ch/code/#/admin/projects/platform/hbp/collaboratory-sphinx-theme',
    license='HBP/EPFL all right reserved',
    author='Olivier Amblet',
    author_email='olivier.amblet@epfl.ch',
    description='Collaboratory theme for Sphinx, 2015 version.',
    long_description=open('README.rst').read(),
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
