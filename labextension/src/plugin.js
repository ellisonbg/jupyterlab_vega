import { IRenderMime } from 'jupyterlab/lib/rendermime';
import { IDocumentRegistry } from 'jupyterlab/lib/docregistry';
import { toArray } from 'phosphor/lib/algorithm/iteration';
import { findLastIndex } from 'phosphor/lib/algorithm/searching';
import { VegaOutput, VegaLiteOutput } from './output';
import { VegaDoc } from './doc';
import './index.css';

/**
 * Activate the extension.
 */
function activatePlugin(app, rendermime, registry) {

  /**
   * Calculate the index of the renderer in the array renderers (e.g. Insert 
   * this renderer after any renderers with mime type that matches "+json") 
   * or simply pass an integer such as 0.
   */
  // const index = findLastIndex(toArray(rendermime.mimetypes()), mimetype => mimetype.endsWith('+json')) + 1;
  const index = 0;
  
  /**
   * Add the renderer to the registry of renderers.
   */
  rendermime.addRenderer('application/vnd.vega+json', new VegaOutput(), index);
  rendermime.addRenderer('application/vnd.vegalite+json', new VegaLiteOutput(), index);
  
  /**
   * Set the extensions associated with Vega.
   */
  const VEGA_EXTENSIONS = ['.vg', 'vg.json', '.json'];
  const VEGALITE_EXTENSIONS = ['.vl', 'vl.json', '.json'];

  /**
   * Add file handler for vg files.
   */

  registry.addWidgetFactory(new VegaDoc({
    fileExtensions: VEGA_EXTENSIONS,
    defaultFor: VEGA_EXTENSIONS.slice(0,2),
    name: 'Vega',
    displayName: 'Vega',
    modelName: 'text',
    preferKernel: false,
    canStartKernel: false
  }));
  
  registry.addWidgetFactory(new VegaDoc({
    fileExtensions: VEGALITE_EXTENSIONS,
    defaultFor: VEGALITE_EXTENSIONS.slice(0,2),
    name: 'VegaLite',
    displayName: 'VegaLite',
    modelName: 'text',
    preferKernel: false,
    canStartKernel: false
  }));

}

const Plugin = {
  id: 'jupyter.extensions.Vega',
  requires: [IRenderMime, IDocumentRegistry],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
