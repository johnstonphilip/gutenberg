/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { Fill, Slot } from '@wordpress/components';

function PluginPinnedAreas( { scope, ...props } ) {
	return <Fill name={ `PluginPinnedAreas/${ scope }` } { ...props } />;
}

PluginPinnedAreas.Slot = ( { scope, className, ...props } ) => (
	<Slot name={ `PluginPinnedAreas/${ scope }` } { ...props }>
		{ ( fills ) =>
			! isEmpty( fills ) && <div className={ className }>{ fills }</div>
		}
	</Slot>
);

export default PluginPinnedAreas;
