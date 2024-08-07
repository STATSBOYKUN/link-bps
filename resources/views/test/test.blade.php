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
    </style>
</head>
<body>
<div class="px-4 md:px-8 lg:px-10 py-4 min-h-screen">
    <div id="loading" class="flex flex-col gap-4 mt-20 items-center justify-center max-w-6xl mx-auto text-[#4C4528FF]">
        <a href="#" class="flex flex-col gap-2 items-center justify-center mb-4">
            <img src="{{ asset('logo/logo.png') }}" class="h-8" alt="Logo"/>
            <span class="text-lg md:text-xl lg:text-2xl text-center font-bold">
            Integrated Links
        </span>
        </a>
        <progress class="progress w-56"></progress>
    </div>
    <div id="content" class="max-w-6xl mx-auto text-[#4C4528FF]" style="display: none;">
        <div class="mb-4">
            <label class="input input-bordered flex items-center gap-2">
                <img class="h-4 w-4 opacity-70" src="{{ asset('logo/search.svg') }}" alt="search"/>
                <input id="searchInput" type="text" name="search" class="grow" placeholder="Cari link..."
                       onkeyup="filterLinks()"/>
            </label>
        </div>
        <div>
            <h3 class="text-lg md:text-xl lg:text-2xl text-[#499380] font-bold mb-2">Top Dikunjungi</h3>
            <div id="topLinksContainer" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mx-auto mb-5">
                <!-- Top link cards -->
            </div>
        </div>
        <div class="flex flex-row items-center gap-4 mb-5">
            <div class="flex flex-row gap-1 items-center">
                <img class="w-auto h-6" src="{{ asset('logo/link.svg') }}" alt="link"/>
                <div class="text-lg md:text-xl lg:text-2xl text-primary font-bold">
                    Administrasi
                </div>
            </div>
        </div>
        <div id="admLinksContainer" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mx-auto mb-4">
            <!-- Link cards -->
        </div>

        <div class="flex flex-row items-center gap-4 mb-5">
            <div class="flex flex-row gap-1 items-center">
                <img class="w-auto h-6" src="{{ asset('logo/link.svg') }}" alt="link"/>
                <div class="text-lg md:text-xl lg:text-2xl text-primary font-bold">
                    Teknis
                </div>
            </div>
        </div>
        <div id="teknisLinksContainer" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mx-auto mb-4">
            <!-- Link cards -->
        </div>

        <div class="flex flex-row items-center gap-4 mb-5">
            <div class="flex flex-row gap-1 items-center">
                <img class="w-auto h-6" src="{{ asset('logo/link.svg') }}" alt="link"/>
                <div class="text-lg md:text-xl lg:text-2xl text-primary font-bold">
                    Links
                </div>
            </div>
            <button class="btn btn-xs btn-accent" onclick="document.getElementById('add_link').showModal()">Tambah +</button>
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
                        <input id="linkAlias" type="text" name="name" placeholder="Masukkan alias link..." class="input input-bordered " required />
                    </div>

                    <div class="link-input-container flex flex-col gap-2 mb-4">
                        <label for="link" class="cursor-pointer text-xs font-bold">
                            Link
                        </label>
                        <input id="linkUrl" type="text" name="link" placeholder="Masukkan alamat link..." class="input input-bordered " required />
                    </div>

                    <div class="modal-action">
                        <button type="button" class="btn" onclick="document.getElementById('add_link').close()">Batal</button>
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
                        <input id="editAlias" type="text" name="name" placeholder="Masukkan alias link..." class="input input-bordered " required />
                    </div>

                    <div class="link-input-container flex flex-col gap-2 mb-4">
                        <label for="editUrl" class="cursor-pointer text-xs font-bold">
                            Link
                        </label>
                        <input id="editUrl" type="text" name="link" placeholder="Masukkan alamat link..." class="input input-bordered " required />
                    </div>

                    <div class="modal-action">
                        <button type="button" class="btn" onclick="document.getElementById('edit_link').close()">Batal</button>
                        <button type="submit" class="btn btn-accent">Simpan</button>
                    </div>
                </form>
            </dialog>
        </div>
        <a class="card h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 border-2 border-base-content/5 card-compact transition-all duration-200 hover:shadow hover:-translate-y-1 link-card">
            <div class="dropdown dropdown-hover dropdown-end absolute top-2 right-2">
                <label tabindex="0" class="cursor-pointer">☰</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                    <li><a class="text-xs" href="#" onclick="editLink('${link.url}')">Edit</a></li>
                    <li><a class="text-xs" href="#" onclick="removeLink('${link.url}')">Remove</a></li>
                </ul>
            </div>
            <figure class="px-1 lg:px-4 pt-3 lg:pt-7 aspect-[2/1] items-end overflow-visible">
                <img src="https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}" onerror="this.src='{{ asset('logo/logo.png') }}'" class="aspect-square w-6 lg:w-10 h-auto" alt="image"/>
            </figure>
            <div class="card-body text-center tooltip" data-tip="${link.alias}">
                <span class="link-text text-xs inline-block max-w-[50px] md:max-w-[75px] lg:max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                    ${link.alias}
                </span>
            </div>
        </a>
        <div id="linksContainer" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mx-auto">
            <!-- Link cards -->
        </div>
    </div>
</div>

<script src="{{ asset('js/load.js') }}"></script>
<script src="{{ asset('js/filter.js') }}"></script>
<script src="{{ asset('js/link.js') }}"></script>

</body>
</html>
