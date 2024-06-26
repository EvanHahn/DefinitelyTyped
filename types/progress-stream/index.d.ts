/// <reference types="node" />

import stream = require("stream");
export = progress_stream;

declare function progress_stream(
    options: progress_stream.Options,
    progressListener: progress_stream.ProgressListener,
): progress_stream.ProgressStream;

declare function progress_stream(
    optionsOrProgressListener?:
        | progress_stream.Options
        | progress_stream.ProgressListener,
): progress_stream.ProgressStream;

declare namespace progress_stream {
    interface Options {
        time?: number | undefined;
        speed?: number | undefined;
        length?: number | undefined;
        drain?: boolean | undefined;
        transferred?: number | undefined;
    }

    type ProgressListener = (progress: Progress) => void;

    interface ProgressStream extends stream.Transform {
        on(event: "progress", listener: ProgressListener): this;
        on(event: "length", listener: (length: number) => void): this;
        once(event: "progress", listener: ProgressListener): this;
        once(event: "length", listener: (length: number) => void): this;
        setLength(length: number): void;
        progress(): Progress;

        // We have to redeclare all on/once overloads from stream.Transform in
        // order for this ProgressStream interface to extend stream.Transform
        // correctly. Using an intersection type instead may be an option once
        // https://github.com/Microsoft/TypeScript/issues/30031 is resolved.

        // stream.Readable events

        /* eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures */
        on(event: "close", listener: () => void): this;
        on(event: "data", listener: (chunk: any) => void): this;
        /* tslint:disable-next-line unified-signatures */
        on(event: "end", listener: () => void): this;
        /* tslint:disable-next-line unified-signatures */
        on(event: "readable", listener: () => void): this;
        on(event: "error", listener: (err: Error) => void): this;
        /* eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures */
        once(event: "close", listener: () => void): this;
        once(event: "data", listener: (chunk: any) => void): this;
        /* tslint:disable-next-line unified-signatures */
        once(event: "end", listener: () => void): this;
        /* tslint:disable-next-line unified-signatures */
        once(event: "readable", listener: () => void): this;
        once(event: "error", listener: (err: Error) => void): this;

        // stream.Writable events

        /* eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures -- unified-signatures */
        on(event: "drain", listener: () => void): this;
        /* tslint:disable-next-line unified-signatures */
        on(event: "finish", listener: () => void): this;
        on(event: "pipe", listener: (src: stream.Readable) => void): this;
        /* tslint:disable-next-line unified-signatures */
        on(event: "unpipe", listener: (src: stream.Readable) => void): this;
        /* eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures -- unified-signatures */
        once(event: "drain", listener: () => void): this;
        /* tslint:disable-next-line unified-signatures */
        once(event: "finish", listener: () => void): this;
        once(event: "pipe", listener: (src: stream.Readable) => void): this;
        /* tslint:disable-next-line unified-signatures */
        once(event: "unpipe", listener: (src: stream.Readable) => void): this;

        // events shared by stream.Readable and stream.Writable

        /* eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures */
        on(event: string | symbol, listener: (...args: any[]) => void): this;
        /* eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures */
        once(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    interface Progress {
        percentage: number;
        transferred: number;
        length: number;
        remaining: number;
        eta: number;
        runtime: number;
        delta: number;
        speed: number;
    }
}
