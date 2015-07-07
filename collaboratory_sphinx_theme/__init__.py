import os

from collaboratory_sphinx_theme.version import __version__


def get_html_theme_path():
    """
    Shortcut for users whose theme is next to their conf.py.
    """
    # Theme directory is defined as our parent directory
    return os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


def update_context(app, pagename, templatename, context, doctree):
    context['alabaster_version'] = __version__


def setup(app):
    app.connect('html-page-context', update_context)
