/* eslint-disable no-unused-vars*/
import React from 'react';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';

import { ImageFit } from 'office-ui-fabric-react/lib/Image';

const BrowsePage = () => {    
     let previewProps = {
      previewImages: [
        {
          name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
          url: 'http://bing.com',
          previewImageSrc: '/Modules/DevOffice.Fabric/dist/document-preview.png',
          iconSrc: '/Modules/DevOffice.Fabric/dist/icon-ppt.png',
          imageFit: ImageFit.cover,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ],
    };
    
    return(
        <DocumentCard onClickHref="http://bing.com">
          <DocumentCardPreview {...previewProps} />
          <DocumentCardTitle
            title="Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx"
            shouldTruncate={true}/>
          <DocumentCardActivity
            activity="Created a few minutes ago"
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: '/Modules/DevOffice.Fabric/images/persona-female.png' }
              ]
            }
          />
        </DocumentCard>
    );
};

export default BrowsePage;
