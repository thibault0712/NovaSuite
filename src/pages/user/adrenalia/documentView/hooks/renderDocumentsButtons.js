export function RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument) {
    return documents
      ?.sort((a, b) => a.position - b.position)
      .map((document, i) => {
        return (
          <div key={i}>
            {parseInt(selectedDocument) === i && (
              <button className="flex-none text-blue-400 dark:text-sky-300 border-r border-r-slate-700/50 dark:border-r-slate-500/30 border-t border-b dark:border-b-slate-700 border-t-blue-400 dark:border-t-sky-300 px-4 py-1 flex items-center whitespace-nowrap">
                {document.title}
              </button>
            )}
            {parseInt(selectedDocument) !== i && (
              <button
                className="flex-none border-r text-neutral-800 dark:text-gray-400 border-r-slate-700/50 dark:border-r-slate-500/30 border-t border-t-transparent px-4 py-1 flex items-center whitespace-nowrap"
                onClick={() => setSelectedDocument(i)}
              >
                {document.title}
              </button>
            )}
          </div>
        );
      });
}