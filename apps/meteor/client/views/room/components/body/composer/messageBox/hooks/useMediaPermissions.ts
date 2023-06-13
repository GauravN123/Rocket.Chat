import { useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { useEffect, useState } from 'react';

type MediaDevices = 'camera' | 'microphone';

const getDeviceKind = (name: MediaDevices): MediaDeviceKind => {
	switch (name) {
		case 'camera':
			return 'videoinput';
		case 'microphone':
			return 'audioinput';
	}
};

export const useMediaPermissions = (name: MediaDevices): [isPermissionDenied: boolean, setIsPermissionDenied: (state: boolean) => void] => {
	const [isPermissionDenied, setIsPermissionDenied] = useState(false);

	const handleMount = useMutableCallback(async (): Promise<void> => {
		console.log('navigator.permissions', Boolean(navigator.permissions));
		if (navigator.permissions) {
			try {
				const permissionStatus = await navigator.permissions.query({ name: name as PermissionName });
				console.log('permissionStatus', permissionStatus.state);
				setIsPermissionDenied(permissionStatus.state === 'denied');
				permissionStatus.onchange = (): void => {
					console.log('permissionStatus.onchange', permissionStatus.state);
					setIsPermissionDenied(permissionStatus.state === 'denied');
				};
				return;
			} catch (error) {
				console.log('not allowed handleMount', JSON.stringify(error));
				console.warn(error);
			}
		}
		console.log('mediaDevices', navigator.mediaDevices);
		console.log('enumerate', navigator.mediaDevices?.enumerateDevices());
		// const check = (await navigator.mediaDevices?.enumerateDevices?.())?.some(({ kind }) => kind === getDeviceKind(name));
		console.log('check', check);

		if (!navigator.mediaDevices?.enumerateDevices) {
			setIsPermissionDenied(true);
			return;
		}

		try {
			if (!(await navigator.mediaDevices.enumerateDevices()).some(({ kind }) => kind === getDeviceKind(name))) {
				setIsPermissionDenied(true);
				return;
			}
		} catch (error) {
			console.log('not allowed enumerate', JSON.stringify(error));

			console.warn(error);
		}
	});

	useEffect(() => {
		handleMount();
	}, [handleMount]);

	console.log('isPermissionDenied', isPermissionDenied);
	return [isPermissionDenied, setIsPermissionDenied];
};
