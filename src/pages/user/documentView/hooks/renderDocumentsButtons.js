export function RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument) {
    return documents
      ?.sort((a, b) => a.position - b.position)
      .map((document, i) => {
        return (
          <div key={i}>
            {parseInt(selectedDocument) === i && (
              <button className="flex-none text-sky-300 border-r border-r-slate-500/30 border-t border-b border-b-slate-700 border-t-sky-300 px-4 py-1 flex items-center whitespace-nowrap">
                {document.title}
              </button>
            )}
            {parseInt(selectedDocument) !== i && (
              <button
                className="flex-none border-r text-gray-400 border-r-slate-500/30 border-t border-t-transparent px-4 py-1 flex items-center whitespace-nowrap"
                onClick={() => setSelectedDocument(i)}
              >
                {document.title}
              </button>
            )}
          </div>
        );
      });
}