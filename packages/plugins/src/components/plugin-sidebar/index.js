/**
 * WordPress dependencies
 */
import { Button, Panel, Slot, Fill } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
//import PinnedPlugins from '../../header/pinned-plugins';
import { withPluginContext } from '../plugin-context';
import SidebarHeader from './sidebar-header';
import PluginPinnedAreas from '../plugin-pinned-areas';

function PluginSidebarSlot( { scope, ...props } ) {
	return <Slot name={ `PluginSidebar/${ scope }` } { ...props } />;
}

function PluginSidebarFill( { scope, ...props } ) {
	return <Fill name={ `PluginSidebar/${ scope }` } { ...props } />;
}

function PluginSidebar( {
	sidebarName,
	children,
	className,
	icon,
	title,
	scope,
	...props
} ) {
	const { isActive, isPinned } = useSelect(
		( select ) => {
			const { getSingleActiveArea, isAreaPinned } = select(
				'core/plugins'
			);
			return {
				isActive: getSingleActiveArea( scope ) === sidebarName,
				isPinned: isAreaPinned( scope, sidebarName ),
			};
		},
		[ sidebarName, scope ]
	);

	const { setSingleActiveArea } = useDispatch( 'core/plugins' );
	return (
		<>
			{ isPinned && (
				<PluginPinnedAreas scope={ scope }>
					<Button
						icon={ icon }
						label={ title }
						onClick={ () =>
							isActive
								? setSingleActiveArea( scope )
								: setSingleActiveArea( scope, sidebarName )
						}
						isPressed={ isActive }
						aria-expanded={ isActive }
					/>
				</PluginPinnedAreas>
			) }
			{ isActive && (
				<PluginSidebarFill scope={ scope } { ...props }>
					<SidebarHeader
						closeLabel={ __( 'Close plugin' ) }
						closeSidebar={ () => setSingleActiveArea( scope ) }
					>
						<strong>{ title }</strong>
					</SidebarHeader>
					<Panel className={ className }>{ children }</Panel>
				</PluginSidebarFill>
			) }
		</>
	);
}

const PluginSidebarWrapped = withPluginContext( ( context, ownProps ) => {
	return {
		icon: ownProps.icon || context.icon,
		sidebarName:
			ownProps.sidebarName || `${ context.name }/${ ownProps.name }`,
	};
} )( PluginSidebar );

PluginSidebarWrapped.Slot = PluginSidebarSlot;

export default PluginSidebarWrapped;
