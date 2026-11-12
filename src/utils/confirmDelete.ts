import Swal from 'sweetalert2';

export interface ConfirmDeleteOptions {
  title: string;
  itemName?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => Promise<unknown> | unknown;
}

/**
 * Displays a centered SweetAlert2 confirmation modal for destructive delete actions.
 * Supports async `onConfirm` callbacks with built-in loading state.
 */
export async function confirmDelete({
  title,
  itemName,
  text = 'This action cannot be undone.',
  confirmButtonText = 'Yes, delete',
  cancelButtonText = 'Cancel',
  onConfirm,
}: ConfirmDeleteOptions): Promise<boolean> {
  const fullText = itemName ? `"${itemName}" — ${text}` : text;

  const result = await Swal.fire({
    title,
    text: fullText,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#64748B',
    reverseButtons: true,
    focusCancel: true,
    showLoaderOnConfirm: Boolean(onConfirm),
    allowOutsideClick: () => !Swal.isLoading(),
    didOpen: (popup) => {
      const container = popup.closest('.swal2-container') as HTMLElement | null;
      if (container) {
        container.style.zIndex = '2000';
      }
    },
    ...(onConfirm
      ? {
          preConfirm: async () => {
            await onConfirm();
          },
        }
      : {}),
  });

  return Boolean(result.isConfirmed);
}

