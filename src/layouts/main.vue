<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
          <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div class="flex-shrink-0 flex items-center">
              <a href="#">
                <img
                  class="block h-8 w-auto"
                  src="https://www.clipartmax.com/png/full/110-1105553_logo-hogwarts-harry-potter-vector-hogwarts-school-of-witchcraft-and-wizardry.png"
                  alt="Workflow"
                />
              </a>
            </div>
          </div>
          <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div
              class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0"
            >
              <div class="w-full">
                <label for="search" class="sr-only">Search</label>
                <div class="relative invisible">
                  <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
            <button
              type="button"
              class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
              aria-expanded="false"
            >
              <span class="sr-only">Open menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <a href="#" class="text-sm font-medium text-gray-900 hover:underline">
              Welcome Admin
            </a>
            <a
              href="#"
              class="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </a>

            <!-- Profile dropdown -->
            <div class="flex-shrink-0 relative ml-5">
              <div class="">
                <button
                  @click="userMenuDown = !userMenuDown"
                  type="button"
                  class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=vBvvca3qOX&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <div
                v-if="userMenuDown"
                class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                  >Your Profile</a
                >

                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                  >Settings</a
                >

                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <nav class="lg:hidden" aria-label="Global">
        <div class="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
          <a
            href="#"
            aria-current="page"
            class="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium text-gray-900"
            >Home</a
          >

          <a
            href="#"
            class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium text-gray-900"
            >Popular</a
          >

          <a
            href="#"
            class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium text-gray-900"
            >Communities</a
          >

          <a
            href="#"
            class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium text-gray-900"
            >Trending</a
          >
        </div>
        <div class="border-t border-gray-200 pt-4 pb-3">
          <div class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=vBvvca3qOX&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">Chelsea Hagon</div>
              <div class="text-sm font-medium text-gray-500">chelseahagon@example.com</div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
            <a
              href="#"
              class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >Your Profile</a
            >

            <a
              href="#"
              class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >Settings</a
            >

            <a
              href="#"
              class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >Sign out</a
            >
          </div>
        </div>
      </nav>
    </header>

    <div class="py-10">
      <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="hidden lg:block lg:col-span-3 xl:col-span-2">
          <nav aria-label="Sidebar" class="sticky top-4 divide-y divide-gray-300">
            <div class="pb-8 space-y-1">
              <div
                @click="navigateToRoute('/' + route.path)"
                :key="route.id"
                v-for="route in routesAside"
                :href="'/' + route.path"
                :class="
                  firstRoute === route.path
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                "
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <span class="truncate"> {{ route.name }} </span>
              </div>
            </div>
            <div class="pt-10">
              <p
                class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                id="communities-headline"
              >
                My communities
              </p>
              <div class="mt-3 space-y-2" aria-labelledby="communities-headline">
                <a
                  href="#"
                  class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                >
                  <span class="truncate"> Quidditch Corner </span>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div class="col-span-10">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from 'vue'

import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const userMenuDown = ref(false)

    const firstRoute = computed(() => route.path.split('/')[1])

    const navigateToRoute = (path: string) => {
      router.push({ path })
    }

    const routesAside = ref([
      {
        id: 1,
        name: 'Students',
        path: 'students',
      },
      {
        id: 2,
        name: 'Add Student',
        path: 'add-student',
      },
      {
        id: 3,
        name: 'Enrolled Courses',
        path: 'enrolled-courses',
      },
    ])

    return {
      routesAside,
      firstRoute,
      userMenuDown,
      navigateToRoute,
    }
  },
})
</script>
