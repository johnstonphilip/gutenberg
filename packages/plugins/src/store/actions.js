/**
 * Returns an action object used in signalling that an active area should be changed.
 *
 * @param {string} scope      Area scope.
 * @param {string} activeArea Area identifier.
 *
 * @return {Object} Action object.
 */
export function setSingleActiveArea( scope, activeArea ) {
	return {
		type: 'SET_SINGLE_ACTIVE_AREA',
		scope,
		activeArea,
	};
}

/**
 * Returns an action object to make an area pinned/unpinned.
 *
 * @param {string}  scope    Area scope.
 * @param {string}  area     Area identifier.
 * @param {boolean} isPinned Boolean indicating if an area should be pinned or not.
 *
 * @return {Object} Action object.
 */
export function setPinnedArea( scope, area, isPinned ) {
	return {
		type: 'SET_PINNED_AREA',
		scope,
		area,
		isPinned,
	};
}
