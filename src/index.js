import React from 'react';
import {
  Text,
  Code,
  Divider,
  Link,
  Checkbox,
  ListItem,
  Heading,
  Image,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
function getCoreProps(props) {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {};
}
export const defaults = {
  paragraph: props => {
    const { children } = props;
    return React.createElement(Text, { mb: 2 }, children);
  },
  emphasis: props => {
    const { children } = props;
    return React.createElement(Text, { as: 'em' }, children);
  },
  blockquote: props => {
    const { children } = props;
    return React.createElement(Code, { p: 2 }, children);
  },
  code: props => {
    const { language, value } = props;
    const className = language && `language-${language}`;
    return React.createElement(
      'pre',
      Object.assign({}, getCoreProps(props)),
      React.createElement(Code, { p: 2, className: className || null }, value)
    );
  },
  delete: props => {
    const { children } = props;
    return React.createElement(Text, { as: 'del' }, children);
  },
  thematicBreak: Divider,
  link: Link,
  img: Image,
  linkReference: Link,
  imageReference: Image,
  text: props => {
    const { children } = props;
    return React.createElement(Text, { as: 'span' }, children);
  },
  list: props => {
    const { start, ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    if (start !== null && start !== 1 && start !== undefined) {
      attrs.start = start.toString();
    }
    let Element = UnorderedList;
    let styleType = 'disc';
    if (ordered) {
      Element = OrderedList;
      styleType = 'decimal';
    }
    if (depth === 1) styleType = 'circle';
    return React.createElement(
      Element,
      Object.assign(
        { spacing: 2, as: ordered ? 'ol' : 'ul', styleType: styleType, pl: 4 },
        attrs
      ),
      children
    );
  },
  listItem: props => {
    const { children, checked } = props;
    let checkbox = null;
    if (checked !== null && checked !== undefined) {
      checkbox = React.createElement(
        Checkbox,
        { isChecked: checked, isReadOnly: true },
        children
      );
    }
    return React.createElement(
      ListItem,
      Object.assign({}, getCoreProps(props), {
        listStyleType: checked !== null ? 'none' : 'inherit',
      }),
      checkbox || children
    );
  },
  definition: () => null,
  heading: props => {
    const { level, children } = props;
    const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    return React.createElement(
      Heading,
      Object.assign(
        { my: 4, as: `h${level}`, size: sizes[`${level - 1}`] },
        getCoreProps(props)
      ),
      children
    );
  },
  inlineCode: props => {
    const { children } = props;
    return React.createElement(
      Code,
      Object.assign({}, getCoreProps(props)),
      children
    );
  },
};
function ChakraUIRenderer(theme = defaults) {
  return {
    paragraph: theme.paragraph,
    emphasis: theme.emphasis,
    blockquote: theme.blockquote,
    code: theme.code,
    delete: theme.delete,
    thematicBreak: theme.thematicBreak,
    link: theme.link,
    img: theme.img,
    linkReference: theme.linkReference,
    imageReference: theme.imageReference,
    text: theme.text,
    list: theme.list,
    listItem: theme.listItem,
    definition: theme.definition,
    heading: theme.heading,
    inlineCode: theme.inlineCode,
  };
}
export default ChakraUIRenderer;
