<!DOCTYPE html>
<html lang="en" data-theme="lemonade">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="">
    <meta name="description" content="">

    {{-- Title --}}
    <title>Integrated Links - BPS Karanganyar</title>
    <link rel="icon" href="{{ asset('logo/logo.ico') }}" type="image/x-icon">

    {{--  CSS  --}}
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <style>
        body {
            overflow-x: hidden;
        }

        .dragging {
            opacity: 0.5;
        }
    </style>
</head>
<body>
<div class="px-4 md:px-8 lg:px-10 py-4 min-h-screen">
    <a href="{{ url('/') }}" class="flex flex-col gap-2 items-center justify-center mb-4">
        <img src="{{ asset('logo/logo.png') }}" class="h-8" alt="Logo"/>
        <span class="text-lg md:text-xl lg:text-2xl text-center font-bold">
            Integrated Links
        </span>
    </a>
    <div class="max-w-6xl mx-auto text-[#4C4528FF]">
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
                <div class="text-lg md:text-xl lg:text-2xl text-[#499380] font-bold">
                    Links
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
                               class="input input-bordered w-full max-w-xs" required/>
                    </div>

                    <div class="link-input-container flex flex-col gap-2 mb-4">
                        <label for="link" class="cursor-pointer text-xs font-bold">
                            Link
                        </label>
                        <input id="linkUrl" type="text" name="link" placeholder="Masukkan alamat link..."
                               class="input input-bordered w-full max-w-xs" required/>
                    </div>

                    <div class="modal-action">
                        <button type="button" class="btn" onclick="document.getElementById('add_link').close()">Close
                        </button>
                        <button type="submit" class="btn btn-accent">Save</button>
                    </div>
                </form>
            </dialog>
        </div>
        <div id="linksContainer" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mx-auto">
            <!-- Link cards -->
        </div>
    </div>
</div>
<script src="{{ asset('js/filter.js') }}"></script>
</body>
</html>
