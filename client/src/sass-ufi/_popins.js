const button = document.querySelector('button[data-target="#myModal"]');
const modal = document.getElementById('myModal');
const close = document.getElementById('close');
const body = document.getElementsByTagName('body')


button.addEventListener('click', () => {
    modal.style.display = 'block';
    modal.style.top = '1';
    window.addEventListener('click', (e) => {
        switch (e.target) {
            case modal:
                modal.style.display = 'block';
                break;
            case button:
                modal.style.display = 'block';
                break;
    
            default:
                modal.style.display = 'none';
                break;
        }
        if (e.target == button || e.target == modal) {
            modal.style.display = 'block';
        }

    })
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    })
});

