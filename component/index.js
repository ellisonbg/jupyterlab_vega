import React from 'react';
import vegaEmbed from 'vega-embed';
import './index.css';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = DEFAULT_WIDTH / 1.5;

function defaultCallback() {
  return {};
}

function embed(el, spec, mode, cb) {
  const embedSpec = { mode, spec };
  if (mode === 'vega-lite') {
    embedSpec.spec.config = {
      ...embedSpec.spec.config,
      cell: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
    };
  }
  vegaEmbed(el, embedSpec, cb);
}

class VegaEmbed extends React.Component {
  static defaultProps = {
    renderedCallback: defaultCallback,
    embedMode: 'vega-lite'
  };

  componentDidMount() {
    embed(
      this.el,
      this.props.data,
      this.props.embedMode,
      this.props.renderedCallback
    );
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  componentDidUpdate() {
    embed(
      this.el,
      this.props.data,
      this.props.embedMode,
      this.props.renderedCallback
    );
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}

export function VegaLite(props) {
  return <VegaEmbed data={props.data} embedMode="vega-lite" />;
}

export function Vega(props) {
  return <VegaEmbed data={props.data} embedMode="vega" />;
}
