import m from "mithril";

export function link(href, text, attrs = {}) {
    return m(
        `a[href=${href}]`,
        Object.assign(attrs, { oncreate : m.route.link }),
        text
    );
}
