<!DOCTYPE html>
<html lang="en" data-theme="lemonade">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="">
    <meta name="description" content="">

    <!-- Title -->
    <title>Integrated Links - BPS Karanganyar</title>
    <link rel="icon" href="{{ asset('logo/logo.ico') }}" type="image/x-icon">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <style>
        body {
            overflow-x: hidden;
        }

        .dragging {
            opacity: 0.5;
        }

        #loading, #content {
            transition: opacity 0.5s ease;
        }

        #searchInputContainer {
            transition: all 0.3s ease;
            opacity: 1;
            height: auto;
            overflow: hidden;
        }

        #searchInputContainer.hidden {
            opacity: 0;
            height: 0;
        }
    </style>
</head>
<body>
<div class="px-2 md:px-8 lg:px-10 py-4 min-h-screen">
    <div id="loading" class="flex flex-col gap-1 mt-20 items-center justify-center max-w-6xl mx-auto text-[#4C4528FF]">
        <a href="#" class="flex flex-col gap-2 items-center justify-center mb-4">
            <img src="{{ asset('logo/logo.png') }}" class="h-8" alt="Logo"/>
            <span class="text-lg md:text-xl lg:text-2xl text-center font-bold">
            Integrated Links
        </span>
        </a>
        <progress class="progress w-56"></progress>
    </div>
    <div id="content" class="max-w-6xl mx-auto text-[#4C4528FF]" style="display: none;">
        <div id="searchInputContainer" class="mb-4 hidden">
            <label class="input input-bordered flex items-center gap-2">
                <img class="h-4 w-4 opacity-70" src="{{ asset('logo/search.svg') }}" alt="search"/>
                <input id="searchInput" type="text" name="search" class="grow" placeholder="Cari link..."
                       onkeyup="filterLinks()"/>
            </label>
        </div>
        <button id="toggleSearchButton" class="fixed bottom-4 right-4 btn btn-accent z-[1]" onclick="toggleSearchBar()">
            <img class="h-5 w-5 opacity-70" src="{{ asset('logo/search.svg') }}" alt="search"/>
        </button>
        <div class="flex flex-row justify-between">
            <div id="admIndicator" class="indicator">
                <span class="indicator-item indicator-center badge badge-accent">Administrasi</span>
                <div id="admLinksContainer"
                     class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mx-auto mb-4 border-t-2 border-secondary rounded-box p-1 pt-3 h-fit">
                    <!-- Link cards -->
                </div>
            </div>
            <div id="teknisIndicator" class="indicator">
                <span class="indicator-item indicator-center badge badge-secondary">Teknis</span>
                <div id="teknisLinksContainer"
                     class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mx-auto mb-4 border-t-2 border-secondary-content rounded-box p-1 pt-3 h-fit">
                    <!-- Link cards -->
                </div>
            </div>
        </div>
        <div class="collapse bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-xs font-bold">
                Custom Links ->
                <div class="divider my-1"></div>
            </div>
            <div class="collapse-content">
                <div class="flex flex-row items-center gap-1 mb-5">
                    <div class="flex flex-row gap-1 items-center">
                        <img class="w-auto h-6" src="{{ asset('logo/link.svg') }}" alt="link"/>
                        <div class="text-lg md:text-xl lg:text-2xl text-primary font-bold">
                            Custom Links
                        </div>
                    </div>
                    <button class="btn btn-xs btn-accent" onclick="document.getElementById('add_link').showModal()">Tambah +
                    </button>
                    <dialog id="add_link" class="modal">
                        <form id="addLinkForm" class="modal-box">
                            <div class="flex flex-row gap-1 items-center">
                                <img class="w-auto h-6" src="{{ asset('logo/link.svg') }}" alt="link"/>
                                <h3 class="text-lg font-bold">
                                    Tambah Link
                                </h3>
                            </div>

                            <div class="divider my-1 mb-2 w-full"></div>
                            <div class="name-input-container flex flex-col gap-2 mb-4">
                                <label for="name" class="cursor-pointer text-xs font-bold">
                                    Alias Link
                                </label>
                                <input id="linkAlias" type="text" name="name" placeholder="Masukkan alias link..."
                                       class="input input-bordered " required/>
                            </div>

                            <div class="link-input-container flex flex-col gap-2 mb-4">
                                <label for="link" class="cursor-pointer text-xs font-bold">
                                    Link
                                </label>
                                <input id="linkUrl" type="text" name="link" placeholder="Masukkan alamat link..."
                                       class="input input-bordered " required/>
                            </div>

                            <div class="modal-action">
                                <button type="button" class="btn" onclick="document.getElementById('add_link').close()">Batal
                                </button>
                                <button type="submit" class="btn btn-accent">Simpan</button>
                            </div>
                        </form>
                    </dialog>

                    <dialog id="edit_link" class="modal">
                        <form id="editLinkForm" class="modal-box">
                            <div class="flex flex-row gap-1 items-center">
                                <img class="w-auto h-6" src="{{ asset('logo/link.svg') }}" alt="link"/>
                                <h3 class="text-lg font-bold">
                                    Edit Link
                                </h3>
                            </div>

                            <div class="divider my-1 mb-2 w-full"></div>
                            <div class="name-input-container flex flex-col gap-2 mb-4">
                                <label for="editAlias" class="cursor-pointer text-xs font-bold">
                                    Alias Link
                                </label>
                                <input id="editAlias" type="text" name="name" placeholder="Masukkan alias link..."
                                       class="input input-bordered " required/>
                            </div>

                            <div class="link-input-container flex flex-col gap-2 mb-4">
                                <label for="editUrl" class="cursor-pointer text-xs font-bold">
                                    Link
                                </label>
                                <input id="editUrl" type="text" name="link" placeholder="Masukkan alamat link..."
                                       class="input input-bordered " required/>
                            </div>

                            <div class="modal-action">
                                <button type="button" class="btn" onclick="document.getElementById('edit_link').close()">Batal
                                </button>
                                <button type="submit" class="btn btn-accent">Simpan</button>
                            </div>
                        </form>
                    </dialog>
                </div>
                <div id="linksContainer" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 mx-auto">
                    <!-- Link cards -->
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/load.js') }}"></script>
<script src="{{ asset('js/filter.js') }}"></script>
<script src="{{ asset('js/link.js') }}"></script>

</body>
</html>
