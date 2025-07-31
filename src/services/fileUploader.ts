import Aws from 'aws-sdk';
import {generateUuid, pathParser, urlToBlob} from '~/utils/helper';
import Config from 'react-native-config';
import {showErrorMessage} from '~/utils/utils';

Aws.config.update({
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  region: Config.AWS_REGION,
});

const s3 = new Aws.S3();

export const uploadFile = async (image: any) => {
  const uuid = generateUuid();
  const name = image?.name;

  const pathSegments = image.path.split('/');
  const filename1 = pathSegments[pathSegments.length - 1];

  const filePath = pathParser(image);
  const fileName = name
    ? `${uuid}.${name.split('.').pop()}`
    : `${uuid}.${filename1.split('.').pop()}`;

  try {
    const fileData = await urlToBlob(filePath);
    const params = {
      Bucket: Config.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileData,
    };
    const res = await s3.upload(params).promise();
    return {...res, uploadedUrl: fileName};
  } catch (error) {
    showErrorMessage(JSON.stringify(error));
    return error;
  }
};

/*


import axios from 'axios';
import {showErrorMessage} from '~/utils/utils';
import {generateUuid, pathParser} from '~/utils/helper';

export const uploadFile = async (image: any) => {
  const uuid = generateUuid();
  const name = image?.name;

  const pathSegments = image.path.split('/');
  const filename1 = pathSegments[pathSegments.length - 1];

  const filePath = pathParser(image);
  const fileName = name
    ? `${uuid}.${name.split('.').pop()}`
    : `${uuid}.${filename1.split('.').pop()}`;

  const files = {
    name: fileName,
    uri: filePath,
    type: image?.mime,
  };
  const formData = new FormData();
  formData.append('file', files);
  const header = {
    'Content-Type': 'multipart/form-data',
  };
  try {
    const response = await axios({
      url: 'http://3.209.13.91:4000',
      method: 'post',
      data: formData,
      headers: header,
      onUploadProgress: progressEvent => {
        // let percent = Math.round(
        //   (progressEvent.loaded * 100) / progressEvent.total,
        // );
        // DeviceEventEmitter.emit('uploadProgress', percent);
      },
    });
    const res = {uploadedUrl: response?.data?.results?.[0]?.Location};
    return res;
  } catch (error) {
    showErrorMessage(JSON.stringify(error));
    return error;
  }
};

*/

// for upload in azure storage
// import ReactNativeBlobUtil from 'react-native-blob-util';
// import Config from 'react-native-config';
// import {isIos} from '~/utils/helper';
// import {showErrorMessage} from '~/utils/utils';

// export const uploadFile = async (param: any) => {
//   const uri = param?.path;
//   const mime: string = param?.mime;
//   const name: string = param?.filename ?? `image${Date.now()}`;

//   return new Promise(async (resolve, reject) => {
//     try {
//       const sasContainerUri = Config.SAS_CONTAINER_URI;
//       const customBlobName = Math.random().toString(16).slice(2);
//       const container = 'images';
//       const sasToken = Config.SAS_TOKEN; // you may need to play with other html verbs in this string e.g., `sp`, `ss` e.t.c.
//       const assetPath = `${sasContainerUri}/${container}/${customBlobName}${name}`;

//       const localUri = isIos ? uri.replace('file://', '/') : uri;
//       const res = await ReactNativeBlobUtil.fetch(
//         'PUT',
//         `${assetPath}?${sasToken}`,
//         {
//           'x-ms-blob-type': 'BlockBlob',
//           'content-type': 'application/octet-stream',
//           'x-ms-blob-content-type': mime || 'image/png',
//         },
//         ReactNativeBlobUtil.wrap(localUri),
//       ).uploadProgress((sent, total) => {
//         param?.changeProgress?.(Math.floor((sent * 100) / total));
//       });
//       if (res.respInfo.status === 201) {
//         resolve({...res, uploadedUrl: `${customBlobName}${name}`});
//       }
//     } catch (error) {
//       showErrorMessage(JSON.stringify(error));
//       reject(error);
//     }
//   });
// };

//upload in aws storage

/*
import axios from 'axios';
import {showErrorMessage} from '~/utils/utils';
import { isIos } from '~/utils/helper';

export const uploadFile = async (image: any) => {
  let pathParts = image?.path?.split('/');
  const files = {
    name: `${Date.now()}-${pathParts?.[pathParts?.length - 1]}`,
    uri: image?.path,
    type: image?.mime,
  };
  const formData = new FormData();
  formData.append('file', files);
  const header = {
    'Content-Type': 'multipart/form-data',
  };
  try {
    const response = await axios({
      url: 'http://3.209.13.91:4000',
      method: 'post',
      data: formData,
      headers: header,
      onUploadProgress: progressEvent => {
        // let percent = Math.round(
        //   (progressEvent.loaded * 100) / progressEvent.total,
        // );
        // DeviceEventEmitter.emit('uploadProgress', percent);
      },
    });
    const res = {uploadedUrl: response?.data?.results?.[0]?.Location};
    return res;
  } catch (error) {
    showErrorMessage(JSON.stringify(error));
    return error;
  }
};

*/
