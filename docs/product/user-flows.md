# User Flows

## Flow 1: Create and Edit

1. User opens app and creates a new LaTeX document.
2. Editor loads with syntax highlighting enabled.
3. User types content and realtime updates propagate to collaborators.
4. Compile trigger runs automatically after debounce or manually on demand.

## Flow 2: Compile + Preview Success

1. Compile request is sent with current revision.
2. System returns compile status `succeeded`.
3. Preview panel updates with latest successful output.
4. Download button is enabled for PDF artifact.

## Flow 3: Compile Failure

1. Compile request is sent with current revision.
2. System returns compile status `failed` and structured errors.
3. Editor highlights errors using returned line/column.
4. Preview panel stays blocked and shows "Fix errors to preview" state.
5. Download button stays disabled until a successful compile occurs.

## Flow 4: Share by Link

1. Owner clicks Share and chooses permission (`view` or `edit`).
2. System generates link token and returns URL.
3. Teammate opens link and gets document access based on permission.
4. If permission is `edit`, teammate can collaborate in realtime.
