/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import type { Ref, ShallowRef } from 'vue-demi'
import type { ConfigurableWindow } from '../_configurable'
import { tryOnScopeDispose } from '@vueuse/shared'
import { ref, shallowRef } from 'vue-demi'
import { defaultWindow } from '../_configurable'

type PostMessage = typeof Worker.prototype['postMessage']

export interface UseWebWorkerReturn<Data = any> {
  data: Ref<Data>
  post: PostMessage
  terminate: () => void
  worker: ShallowRef<Worker | undefined>
}

type WorkerFn = (...args: unknown[]) => Worker

/**
 * 简单的 Web Workers 注册和通信。
 *
 * @see https://vueuse.org/useWebWorker
 * @param url
 * @param workerOptions
 * @param options
 */
export function useWebWorker<T = any>(
  url: string,
  workerOptions?: WorkerOptions,
  options?: ConfigurableWindow,
): UseWebWorkerReturn<T>

/**
 * 简单的 Web Workers 注册和通信。
 *
 * @see https://vueuse.org/useWebWorker
 * @param worker
 */
export function useWebWorker<T = any>(
  worker: Worker | WorkerFn
): UseWebWorkerReturn<T>

export function useWebWorker<Data = any>(
  arg0: string | WorkerFn | Worker,
  workerOptions?: WorkerOptions,
  options?: ConfigurableWindow,
): UseWebWorkerReturn<Data> {
  const {
    window = defaultWindow,
  } = options ?? {}

  const data: Ref<any> = ref(null)
  const worker = shallowRef<Worker>()

  const post: PostMessage = (...args) => {
    if (!worker.value)
      return

    worker.value.postMessage(...args as Parameters<PostMessage>)
  }

  const terminate: typeof Worker.prototype['terminate'] = function terminate() {
    if (!worker.value)
      return

    worker.value.terminate()
  }

  if (window) {
    if (typeof arg0 === 'string')
      worker.value = new Worker(arg0, workerOptions)
    else if (typeof arg0 === 'function')
      worker.value = (arg0 as any)()
    else
      worker.value = arg0

    worker.value!.onmessage = (e: MessageEvent) => {
      data.value = e.data
    }

    tryOnScopeDispose(() => {
      if (worker.value)
        worker.value.terminate()
    })
  }

  return {
    data,
    post,
    terminate,
    worker,
  }
}
