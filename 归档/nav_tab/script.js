document.addEventListener('DOMContentLoaded', () => {
    const tabsNavElement = document.getElementById('tabs-nav');
    const tabContentWrapperElement = document.getElementById('tab-content-wrapper');

    // 模拟从后端获取的数据 (与之前相同)
    const categoriesData = [
        {
            "versionName": "分类 A",
            "id": "category-a",
            "cards": [
                {
                    "versionName": "分类 A - 项目概览",
                    "id": "card-a-1",
                    "content": [
                        {
                            "versionName": "版本 1.0",
                            "metric1": 10.5,
                            "metric2": 20.12,
                            "metric3": 5.0,
                            "metric4": 15.75,
                            "extraField1": "不显示",
                            "extraField2": 99.9,
                            "longMetric5": 12345.6789,
                            "longMetric6": 98765.4321
                        },
                        {
                            "versionName": "版本 1.1",
                            "metric1": 12.3,
                            "metric2": 22.5,
                            "metric3": 6.2,
                            "metric4": 18.9,
                            "longMetric5": 12345.6789,
                            "longMetric6": 98765.4321
                        },
                        {
                            "versionName": "版本 1.2",
                            "metric1": 11.8,
                            "metric2": 21.9,
                            "metric3": 5.8,
                            "metric4": 17.3,
                            "longMetric5": 12345.6789,
                            "longMetric6": 98765.4321
                        }
                    ]
                },
                {
                    "versionName": "分类 A - 性能指标",
                    "id": "card-a-2",
                    "content": [
                        {
                            "versionName": "基线",
                            "loadTime": 2.1,
                            "memoryUsage": 50.3,
                            "cpuUsage": 12.8,
                            "diskIO": 100.5,
                            "networkLatency": 25.0,
                            "throughput": 500.0
                        },
                        {
                            "versionName": "优化版",
                            "loadTime": 1.5,
                            "memoryUsage": 45.1,
                            "cpuUsage": 10.5,
                            "diskIO": 80.2,
                            "networkLatency": 20.0,
                            "throughput": 600.0
                        },
                        {
                            "versionName": "最新版",
                            "loadTime": 1.2,
                            "memoryUsage": 42.0,
                            "cpuUsage": 9.8,
                            "diskIO": 75.1,
                            "networkLatency": 18.0,
                            "throughput": 650.0
                        }
                    ]
                }
            ]
        },
        {
            "versionName": "分类 B",
            "id": "category-b",
            "cards": [
                {
                    "versionName": "分类 B - 用户数据",
                    "id": "card-b-1",
                    "content": [
                        {
                            "versionName": "Q1",
                            "activeUsers": 12345.67,
                            "newRegistrations": 890.12,
                            "churnRate": 0.05
                        },
                        {
                            "versionName": "Q2",
                            "activeUsers": 15000.89,
                            "newRegistrations": 1020.34,
                            "churnRate": 0.03
                        }
                    ]
                }
            ]
        },
        {
            "versionName": "分类 C",
            "id": "category-c",
            "cards": [
                {
                    "versionName": "分类 C - 错误报告",
                    "id": "card-c-1",
                    "content": [
                        {
                            "versionName": "Bugfix 1",
                            "criticalBugs": 3,
                            "minorBugs": 15,
                            "totalBugs": 18
                        }
                    ]
                }
            ]
        }
    ];

    // --- 表格列配置模板 ---
    const tableColumnConfigs = {
        'card-a-1': [
            { key: 'versionName', label: '版本' },
            { key: 'metric1', label: '指标一' },
            { key: 'metric2', label: '指标二' },
            { key: 'metric3', label: '指标三' },
            { key: 'metric4', label: '指标四' },
            { key: 'longMetric5', label: '长指标五' }, // 添加更多列来测试滚动
            { key: 'longMetric6', label: '长指标六' }
        ],
        'card-a-2': [
            { key: 'versionName', label: '版本名称' },
            { key: 'loadTime', label: '加载时间 (s)' },
            { key: 'memoryUsage', label: '内存使用 (MB)' },
            { key: 'cpuUsage', label: 'CPU 使用 (%)' },
            { key: 'diskIO', label: '磁盘IO (MB/s)' },
            { key: 'networkLatency', label: '网络延迟 (ms)' },
            { key: 'throughput', label: '吞吐量 (Mbps)' }
        ],
        'card-b-1': [
            { key: 'versionName', label: '季度' },
            { key: 'activeUsers', label: '活跃用户' },
            { key: 'newRegistrations', label: '新增注册' },
            { key: 'churnRate', label: '流失率' }
        ]
    };


    let draggedItem = null;
    let currentCardContainer = null;

    // --- 辅助函数：生成表格 HTML ---
    function generateTableHtml(cardId, dataArray) {
        if (!dataArray || dataArray.length === 0) {
            return '<p>无数据。</p>';
        }

        let columnsToDisplay = tableColumnConfigs[cardId];

        if (!columnsToDisplay) {
            const allKeys = new Set();
            dataArray.forEach(item => {
                Object.keys(item).forEach(key => {
                    allKeys.add(key);
                });
            });

            columnsToDisplay = Array.from(allKeys)
                .filter(key => key !== 'versionName')
                .map(key => ({
                    key: key,
                    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                }));
            columnsToDisplay.unshift({ key: 'versionName', label: '版本' });
        }

        // 构建表头行
        const headerRow = columnsToDisplay.map(col => {
            const stickyClass = col.key === 'versionName' ? ' sticky-column' : ''; // 添加 sticky-column 类
            return `<th class="${stickyClass}">${col.label}</th>`;
        }).join('');

        // 构建数据行
        const dataRows = dataArray.map(item => {
            const rowCells = columnsToDisplay.map(col => {
                const value = item[col.key] !== undefined ? item[col.key] : '-';
                const className = col.key === 'versionName' ? 'version-name sticky-column' : ''; // 同时添加 version-name 和 sticky-column
                return `<td class="${className}">${value}</td>`;
            }).join('');
            return `<tr>${rowCells}</tr>`;
        }).join('');

        // 将表格包裹在新的滚动容器中
        return `
            <div class="table-scroll-wrapper">
                <table>
                    <thead>
                        <tr>${headerRow}</tr>
                    </thead>
                    <tbody>
                        ${dataRows}
                    </tbody>
                </table>
            </div>
        `;
    }

    // --- 渲染函数 ---
    function renderContent(data) {
        let tabsHtml = '';
        let panesHtml = '';

        data.forEach((category, index) => {
            const isActiveCategory = index === 0 ? 'active' : '';

            tabsHtml += `
                <button class="tab-button ${isActiveCategory}" data-tab="${category.id}">
                    ${category.versionName}
                </button>
            `;

            let cardsHtml = '';
            category.cards.forEach(card => {
                let cardContentHtml = '';
                if (Array.isArray(card.content)) {
                    cardContentHtml = generateTableHtml(card.id, card.content);
                } else if (typeof card.content === 'string') {
                    cardContentHtml = card.content;
                } else {
                    cardContentHtml = '<p>无有效内容。</p>';
                }

                cardsHtml += `
                    <div class="card" id="${card.id}">
                        <div class="card-header">
                            <span class="card-title">${card.versionName}</span>
                            <div class="card-actions">
                                <button class="toggle-content" data-target="content-${card.id}">折叠/展开</button>
                                <button class="drag-handle">移动</button>
                            </div>
                        </div>
                        <div class="card-content" id="content-${card.id}">
                            ${cardContentHtml}
                        </div>
                    </div>
                `;
            });

            panesHtml += `
                <div class="tab-pane ${isActiveCategory}" id="${category.id}">
                    <div class="card-container" id="card-container-${category.id}">
                        ${cardsHtml}
                    </div>
                </div>
            `;
        });

        tabsNavElement.innerHTML = tabsHtml;
        tabContentWrapperElement.innerHTML = panesHtml;

        currentCardContainer = document.querySelector('.tab-pane.active .card-container');
    }

    renderContent(categoriesData);


    // --- Tab 切换逻辑 (保持不变) ---
    tabsNavElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-button')) {
            const targetTabId = e.target.dataset.tab;

            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });

            e.target.classList.add('active');
            const activePane = document.getElementById(targetTabId);
            if (activePane) {
                activePane.classList.add('active');
                currentCardContainer = activePane.querySelector('.card-container');
            }
        }
    });

    // --- 卡片折叠/展开逻辑 (保持不变) ---
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-content')) {
            const targetId = e.target.dataset.target;
            const contentDiv = document.getElementById(targetId);
            if (contentDiv) {
                contentDiv.classList.toggle('collapsed');
            }
        }
    });

    // --- 拖拽逻辑 (保持不变) ---
    document.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('drag-handle')) {
            const card = e.target.closest('.card');
            if (card && currentCardContainer.contains(card)) {
                card.setAttribute('draggable', 'true');
                draggedItem = card;
                setTimeout(() => {
                    draggedItem.classList.add('dragging');
                }, 0);
            }
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (draggedItem && e.target === draggedItem) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', draggedItem.id);
        } else {
            e.preventDefault();
        }
    });

    document.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem.removeAttribute('draggable');
            draggedItem = null;
        }
    });

    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedItem && e.target.classList.contains('card') && draggedItem !== e.target && currentCardContainer.contains(e.target)) {
            const boundingBox = e.target.getBoundingClientRect();
            const offset = boundingBox.y + (boundingBox.height / 2);

            if (e.clientY < offset) {
                currentCardContainer.insertBefore(draggedItem, e.target);
            } else {
                currentCardContainer.insertBefore(draggedItem, e.target.nextSibling);
            }
        }
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
    });
});