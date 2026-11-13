import { API_BASE_URL, baseApi } from '@/redux/api/baseApi';

export interface UploadedMediaItem {
  url: string;
  publicId: string;
}

export interface UploadMediaArgs {
  files: File[];
  onProgress?: (percent: number) => void;
}

function uploadWithProgress(
  files: File[],
  token: string | null,
  onProgress?: (percent: number) => void,
): Promise<UploadedMediaItem[]> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/upload`);
    xhr.withCredentials = true;
    xhr.timeout = 180_000;

    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    xhr.upload.onprogress = (evt) => {
      if (onProgress && evt.lengthComputable && evt.total > 0) {
        const pct = Math.min(99, Math.round((evt.loaded * 100) / evt.total));
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      try {
        const parsed = JSON.parse(xhr.responseText || '{}') as {
          data?: UploadedMediaItem | UploadedMediaItem[];
          message?: string;
        };

        if (xhr.status >= 200 && xhr.status < 300) {
          onProgress?.(100);
          const payload = parsed.data ?? (parsed as unknown as UploadedMediaItem[]);
          resolve(Array.isArray(payload) ? payload : [payload]);
        } else {
          reject(new Error(parsed.message || `Upload failed with status ${xhr.status}`));
        }
      } catch {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during media upload.'));
    xhr.ontimeout = () => reject(new Error('Media upload timed out.'));
    xhr.send(formData);
  });
}

export const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadMedia: builder.mutation<UploadedMediaItem[], UploadMediaArgs>({
      async queryFn({ files, onProgress }, api) {
        const state = api.getState() as { auth?: { token?: string | null } };
        const storedToken =
          typeof window !== 'undefined' ? window.localStorage.getItem('lab_access_token') : null;
        const token = state?.auth?.token || storedToken;

        try {
          const data = await uploadWithProgress(files, token, onProgress);
          return { data };
        } catch (err) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: err instanceof Error ? err.message : 'Media upload failed',
            },
          };
        }
      },
    }),
  }),
});

export const { useUploadMediaMutation } = mediaApi;

