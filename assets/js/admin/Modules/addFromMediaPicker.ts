﻿import { GalleryModel } from '../Models/galleryModel';
import { GalleryJsonModel } from '../Models/galleryJsonModel';
import { GalleryPartItem } from '../Models/galleryPartItem';
import { GalleryPartType } from '../Models/galleryPartType';

export const addFromMediaPicker = (): GalleryModel => {
    const galleryModel = new GalleryModel();

    galleryModel.description =
        'This module allows users to add image from media picker';
    galleryModel.actionLabel = 'Add From Media Picker';

    const id = $('.gallery').attr('id');

    galleryModel.action = () => {
        const $modal = $('.gallery > .' + id + '-ModalBody');
        initModal($modal);
        $modal.show();
    };

    const initModal = ($modal: JQuery) => {
        // Update title
        $modal.find('.modal-title').html('Add Media');

        // Add content
        $("#mediaApp").detach().appendTo($modal.find('.modal-body')).show();

        // Trigger cancel button
        const $cancelButtons = $modal.find('button[data-dismiss="modal"]');
        $cancelButtons.each((index: number) => {
            const $cancelButton = $($cancelButtons[index]);
            $cancelButton.on('click', () => {
                $modal.hide();
                removeEventListener($modal);
            });
        });

        // Trigger ok button
        const $okButton = $modal.find('button[data-accept="model"]').first();
        $okButton.on('click', () => {
            const mediaApp = (window as any).mediaApp;
            
            const $jsonInput = $('.gallery > .' + id + '-MediaItems').first();

            mediaApp.selectedMedias.forEach((media:any) => {
                const galleryJsonModel = new GalleryJsonModel($jsonInput);
                const galleryPartItem = new GalleryPartItem(
                    GalleryPartType.Image,
                    media.url,
                    '',
                    media.url
                );
                galleryJsonModel.add(galleryPartItem); 
            });

            $modal.hide();
            removeEventListener($modal);
        });
    };

    const removeEventListener = ($modal: JQuery) => {
        // Remove click events
        const $cancelButtons = $modal.find('button[data-dismiss="modal"]');
        $cancelButtons.each((index: number) => {
            const $cancelButton = $($cancelButtons[index]);
            $cancelButton.off('click');
        });

        const $okButton = $modal.find('button[data-accept="model"]').first();
        $okButton.off('click');
    };


    return galleryModel;
};
