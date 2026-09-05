// Scroll position saved when an overlay takes over the page, so closing it can
// restore where the user was. Shared by the fullscreen view, the library and the
// exercise slide-out, which is why it lives here rather than in one of them.
let _savedScrollY = 0;
