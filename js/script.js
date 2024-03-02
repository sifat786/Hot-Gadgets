const loadPhone = async (searchText = 'o', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    //? 1.find the div:
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new cards:
    phoneContainer.textContent = '';

    // display show all btn if there are more than 12 phones:
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // display only first 12 phones and if not show all:
    if(!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {

        //? 2.create a div:
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card shadow-md w-auto bg-white rounded-lg border border-stone-300`;

        //? 3. set innerHtml:
        phoneCard.innerHTML = `
        <div class="m-[25px] bg-blue-600 bg-opacity-5 rounded-lg">
            <figure class="px-[80px] py-[42px]">
            <img src="${phone.image}" alt="Phone" class="rounded-xl"/>
            </figure>
        </div>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-neutral-700 text-[25px] font-bold">${phone.phone_name}</h2>
            <p class="text-neutral-500 text-lg font-normal leading-[30px] pb-2">There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-center text-neutral-700 text-[25px] font-bold pb-2">$999</p>
            <div class="card-actions">
            <button onclick="handleShowDetails('${phone.slug}')" class="py-[9px] px-[25px] bg-blue-600 rounded-lg         text-white text-xl font-semibold">Show Details</button>
            </div>
        </div>
        `;

        //? 4. append child:
        phoneContainer.appendChild(phoneCard);

    });
    // hide loader spinner:
    toggleLoadingSpinner(false)
}

//! handle search btn:
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

//! loading spinner:
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

//! handle show all:
const handleShowAll = () => {
    handleSearch(true);
}

//! handle show details btn:
const handleShowDetails = async (id) => {
    //? load single phone data:
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    
    showPhoneDetails(phone)
}

//! show phone details:
const showPhoneDetails = phone => {

    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.innerHTML = `
    <div class="bg-blue-600 bg-opacity-5 rounded-lg">
        <figure class="px-[202px] py-[51px]">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl ml-[80px]"/>
        </figure>
    </div>
    <h3 class="text-neutral-700 text-3xl font-bold pt-10 pb-6">${phone.name}</h3>
    <p class="w-auto text-neutral-500 text-base font-normal leading-relaxed pb-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

    <p class="text-neutral-700 text-xl font-semibold pb-4">Storage : <span class="text-neutral-500 text-xl">${phone.mainFeatures.storage}</span></p>
    <p class="text-neutral-700 text-xl font-semibold pb-4">Display Size : <span class="text-neutral-500 text-xl">${phone.mainFeatures.displaySize}</span></p>
    <p class="text-neutral-700 text-xl font-semibold pb-4">Chip Set : <span class="text-neutral-500 text-xl">${phone.mainFeatures.chipSet}</span></p>
    <p class="text-neutral-700 text-xl font-semibold pb-4">Memory : <span class="text-neutral-500 text-xl">${phone.mainFeatures.memory}</span></p>
    <p class="text-neutral-700 text-xl font-semibold pb-4">Slug : <span class="text-neutral-500 text-xl">${phone.slug}</span></p>
    <p class="text-neutral-700 text-xl font-semibold pb-4">Release Date : <span class="text-neutral-500 text-xl">${phone.releaseDate}</span></p>
    <p class="text-neutral-700 text-xl font-semibold pb-4">Brand : <span class="text-neutral-500 text-xl">${phone.brand}</span></p>
    <p class="text-neutral-700 text-xl font-semibold pb-4">GPS : <span class="text-neutral-500 text-xl">${phone.others?.GPS || 'GPS not available'}</span></p>
    `;

    //* show the modal:
    showDetailsModal.showModal()
}

loadPhone()