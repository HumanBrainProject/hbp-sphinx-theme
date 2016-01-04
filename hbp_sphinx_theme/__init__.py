"""
Human Brain Project Sphinx theme
"""
import os

# This file has been adapted from
# https://github.com/snide/sphinx_rtd_theme/blob/master/sphinx_rtd_theme/__init__.py
__version__ = '0.3.3'


def get_html_theme_path():
    """Return list of HTML theme paths."""
    cur_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    return cur_dir
