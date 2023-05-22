export interface ToastDetails {
    name: string,
    icon: string,
    title: string,
    text: string,
}

export const toastDetails : ToastDetails[] = [
    {
        name: 'success',
        icon: '&#10004;',
        title: 'Success',
        text: 'This is a success toast.',
    },
    {
        name: 'error',
        icon: '&#10008;',
        title: 'Error',
        text: 'This is an error toast.',
    },
    {
        name: 'warning',
        icon: '&#9888;',
        title: 'Warning',
        text: 'This is a warning toast.',
    },
    {
        name: 'info',
        icon: '&#8505;',
        title: 'Info',
        text: 'This is an information toast.',
    }
]

export const createToast = (classe: ToastDetails) => {
    const notifications = document.querySelector(".notifications")
    const toast = document.createElement("li");
    toast.className = `toast ${classe.name}`;
    toast.innerHTML = `<div class="column">
                         <i>${classe.icon}</i>                     
                         <i>${classe.title}</i>
                         <span>${classe.text}</span>
                      </div>
                      <i onClick="removeToast(this.parentElement)">&#10006;</i>`;
    notifications?.appendChild(toast);
    setTimeout(()=> removeToast(toast), 5000)
}
const removeToast = (toast: any) => {
    toast.classList.add('hide') 
    if(toast.timeoutId) clearTimeout(toast.timeoutId)
    setTimeout(() => toast.remove(), 500)
}