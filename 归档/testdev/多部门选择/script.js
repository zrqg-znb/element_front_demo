// 项目看板数据 - 支持多层级组织下的项目分布
const organizationData = {
    '研发中心': {
        projects: [
            { id: 'RD001', name: '企业门户网站重构' },
            { id: 'RD002', name: '内部OA系统升级' }
        ],
        departments: {
            '前端技术部': {
                projects: [
                    { id: 'FE001', name: 'UI组件库开发' },
                    { id: 'FE002', name: '性能优化方案' }
                ],
                departments: {
                    'Web团队': {
                        projects: [
                            { id: 'WEB001', name: '响应式布局重构' },
                            { id: 'WEB002', name: 'WebApp框架升级' }
                        ],
                        departments: {}
                    },
                    '移动团队': {
                        projects: [
                            { id: 'MOB001', name: 'iOS客户端V2.0' },
                            { id: 'MOB002', name: 'Android客户端V2.0' }
                        ],
                        departments: {}
                    }
                }
            },
            '后端技术部': {
                projects: [
                    { id: 'BE001', name: '微服务架构转型' },
                    { id: 'BE002', name: '数据库性能优化' }
                ],
                departments: {
                    'Java团队': {
                        projects: [
                            { id: 'JAVA001', name: 'Spring Cloud实施' },
                            { id: 'JAVA002', name: '支付系统重构' }
                        ],
                        departments: {}
                    },
                    'Python团队': {
                        projects: [
                            { id: 'PY001', name: '数据分析平台' },
                            { id: 'PY002', name: '爬虫系统优化' }
                        ],
                        departments: {}
                    }
                }
            }
        }
    },
    '产品中心': {
        projects: [
            { id: 'PM001', name: '产品路线图规划' },
            { id: 'PM002', name: '竞品分析报告' }
        ],
        departments: {
            '用户体验部': {
                projects: [
                    { id: 'UX001', name: 'UI设计规范制定' },
                    { id: 'UX002', name: '用户调研' }
                ],
                departments: {}
            },
            '产品规划部': {
                projects: [
                    { id: 'PP001', name: '新功能需求分析' },
                    { id: 'PP002', name: '产品迭代计划' }
                ],
                departments: {}
            }
        }
    },
    '运营中心': {
        projects: [
            { id: 'OP001', name: '年度运营计划' },
            { id: 'OP002', name: '用户增长策略' }
        ],
        departments: {
            '市场部': {
                projects: [
                    { id: 'MK001', name: '品牌推广活动' },
                    { id: 'MK002', name: '社交媒体运营' }
                ],
                departments: {}
            },
            '客户服务部': {
                projects: [
                    { id: 'CS001', name: '客服系统升级' },
                    { id: 'CS002', name: '满意度提升计划' }
                ],
                departments: {}
            }
        }
    }
};

class CascadeSelector {
    constructor() {
        this.selectedProjects = new Set(); // 存储选中的项目
        this.isOpen = false;
        this.currentPath = []; // 当前浏览路径
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderLevel1();
    }

    bindEvents() {
        const dropdownHeader = document.getElementById('dropdownHeader');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const sendRequestBtn = document.getElementById('sendRequestBtn');

        dropdownHeader.addEventListener('click', () => this.toggleDropdown());
        confirmBtn.addEventListener('click', () => this.confirmSelection());
        cancelBtn.addEventListener('click', () => this.cancelSelection());
        sendRequestBtn.addEventListener('click', () => this.sendRequest());

        // 点击外部关闭下拉框
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        const header = document.getElementById('dropdownHeader');
        const content = document.getElementById('dropdownContent');
        
        header.classList.add('active');
        content.classList.add('show');
        this.isOpen = true;
    }

    closeDropdown() {
        const header = document.getElementById('dropdownHeader');
        const content = document.getElementById('dropdownContent');
        
        header.classList.remove('active');
        content.classList.remove('show');
        this.isOpen = false;
    }

    renderLevel1() {
        const level1Container = document.getElementById('level1');
        level1Container.innerHTML = '';
        this.currentPath = [];

        Object.keys(organizationData).forEach(orgName => {
            const item = this.createOrganizationItem(orgName, 1, []);
            level1Container.appendChild(item);
        });
    }

    renderLevel2(selectedOrg) {
        const level2Container = document.getElementById('level2');
        const level3Container = document.getElementById('level3');
        
        level2Container.innerHTML = '';
        level3Container.innerHTML = '';
        this.currentPath = [selectedOrg];

        const orgData = this.getOrganizationData([selectedOrg]);
        if (orgData) {
            // 渲染直属项目
            if (orgData.projects && orgData.projects.length > 0) {
                orgData.projects.forEach(project => {
                    const projectItem = this.createProjectItem(project, 2, [selectedOrg]);
                    level2Container.appendChild(projectItem);
                });
            }
            
            // 渲染子组织
            if (orgData.departments) {
                Object.keys(orgData.departments).forEach(subOrg => {
                    const orgItem = this.createOrganizationItem(subOrg, 2, [selectedOrg]);
                    level2Container.appendChild(orgItem);
                });
            }
        }
    }

    renderLevel3(path) {
        const level3Container = document.getElementById('level3');
        level3Container.innerHTML = '';
        this.currentPath = [...path];

        const orgData = this.getOrganizationData(path);
        if (orgData) {
            // 渲染直属项目
            if (orgData.projects && orgData.projects.length > 0) {
                orgData.projects.forEach(project => {
                    const projectItem = this.createProjectItem(project, 3, path);
                    level3Container.appendChild(projectItem);
                });
            }
            
            // 渲染子组织
            if (orgData.departments) {
                Object.keys(orgData.departments).forEach(subOrg => {
                    const orgItem = this.createOrganizationItem(subOrg, 3, path);
                    level3Container.appendChild(orgItem);
                });
            }
        }
    }

    getOrganizationData(path) {
        let current = organizationData;
        for (const org of path) {
            if (current[org]) {
                current = current[org];
            } else if (current.departments && current.departments[org]) {
                current = current.departments[org];
            } else {
                return null;
            }
        }
        return current;
    }

    getAllProjectsInOrganization(path) {
        const projects = [];
        const orgData = this.getOrganizationData(path);
        
        const collectProjects = (data, currentPath) => {
            if (data.projects) {
                data.projects.forEach(project => {
                    projects.push({ project, path: [...currentPath] });
                });
            }
            if (data.departments) {
                Object.keys(data.departments).forEach(subOrg => {
                    collectProjects(data.departments[subOrg], [...currentPath, subOrg]);
                });
            }
        };
        
        if (orgData) {
            collectProjects(orgData, path);
        }
        
        return projects;
    }

    createOrganizationItem(orgName, level, parentPath) {
        const item = document.createElement('div');
        item.className = 'level-item organization-item';
        
        const fullPath = [...parentPath, orgName];
        const pathKey = fullPath.join(' > ');
        
        const label = document.createElement('label');
        label.innerHTML = `🏢 ${orgName}`;
        
        item.appendChild(label);

        // 点击事件处理级联展开
        item.addEventListener('click', () => {
            if (level === 1) {
                this.renderLevel2(orgName);
            } else if (level === 2) {
                this.renderLevel3([...parentPath, orgName]);
            }
        });

        return item;
    }

    createProjectItem(project, level, parentPath) {
        const item = document.createElement('div');
        item.className = 'level-item project-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const projectId = project.id;
        const projectName = project.name;
        const projectStatus = project.status;
        const projectPriority = project.priority;
        
        checkbox.id = `project-${level}-${projectId}`;
        
        const label = document.createElement('label');
        label.innerHTML = `📊 ${projectName}`;
        label.setAttribute('for', checkbox.id);
        
        item.appendChild(checkbox);
        item.appendChild(label);

        // 检查是否已选中
        if (this.selectedProjects.has(projectId)) {
            checkbox.checked = true;
            item.classList.add('selected');
        }

        // 绑定事件
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.selectedProjects.add(projectId);
                item.classList.add('selected');
            } else {
                this.selectedProjects.delete(projectId);
                item.classList.remove('selected');
            }
        });

        return item;
    }

    confirmSelection() {
        this.updateSelectedDisplay();
        this.closeDropdown();
    }

    cancelSelection() {
        this.closeDropdown();
    }

    updateSelectedDisplay() {
        const selectedText = document.getElementById('selectedText');
        const selectedList = document.getElementById('selectedList');
        
        const totalSelected = this.selectedProjects.size;
        
        if (totalSelected === 0) {
            selectedText.textContent = '请选择项目...';
            selectedList.innerHTML = '<p style="color: #999;">暂无选择的项目</p>';
        } else {
            selectedText.textContent = `已选择 ${totalSelected} 个项目`;
            
            selectedList.innerHTML = '';
            
            // 显示选中的项目
            const projectHeader = document.createElement('div');
            projectHeader.innerHTML = '<strong>选中的项目：</strong>';
            projectHeader.style.marginBottom = '8px';
            selectedList.appendChild(projectHeader);
            
            // 获取所有项目数据，用于显示详细信息
            const allProjects = [];
            const collectAllProjects = (data, path = []) => {
                if (data.projects) {
                    data.projects.forEach(project => {
                        allProjects.push({
                            id: project.id,
                            name: project.name,
                            path: [...path]
                        });
                    });
                }
                if (data.departments) {
                    Object.keys(data.departments).forEach(org => {
                        collectAllProjects(data.departments[org], [...path, org]);
                    });
                }
            };
            
            // 收集所有项目
            Object.keys(organizationData).forEach(org => {
                collectAllProjects(organizationData[org], [org]);
            });
            
            // 显示选中的项目
            this.selectedProjects.forEach(projectId => {
                const projectInfo = allProjects.find(p => p.id === projectId);
                if (projectInfo) {
                    const tag = document.createElement('span');
                    tag.className = 'selected-tag';
                    tag.innerHTML = `📊 ${projectInfo.name} <small>(${projectInfo.path.join(' > ')})</small>`;
                    
                    // 添加删除按钮
                    const deleteBtn = document.createElement('span');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = '×';
                    
                    // 添加点击事件
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation(); // 阻止事件冒泡
                        this.selectedProjects.delete(projectId);
                        this.updateSelectedDisplay();
                        
                        // 更新选择框状态
                        const checkboxes = document.querySelectorAll(`input[id^="project-"][id$="-${projectId}"]`);
                        checkboxes.forEach(checkbox => {
                            checkbox.checked = false;
                            checkbox.closest('.level-item').classList.remove('selected');
                        });
                    });
                    
                    tag.appendChild(deleteBtn);
                    selectedList.appendChild(tag);
                }
            });
        }
    }
    
    // 状态颜色方法已移除

    getSelectedArray() {
        // 获取所有项目数据，用于返回详细信息
        const allProjects = [];
        const collectAllProjects = (data, path = []) => {
            if (data.projects) {
                data.projects.forEach(project => {
                    allProjects.push({
                        id: project.id,
                        name: project.name,
                        path: [...path]
                    });
                });
            }
            if (data.departments) {
                Object.keys(data.departments).forEach(org => {
                    collectAllProjects(data.departments[org], [...path, org]);
                });
            }
        };
        
        // 收集所有项目
        Object.keys(organizationData).forEach(org => {
            collectAllProjects(organizationData[org], [org]);
        });
        
        // 过滤出选中的项目
        const selectedProjectsData = allProjects.filter(project => 
            this.selectedProjects.has(project.id)
        );
        
        return {
            selectedProjects: selectedProjectsData,
            totalProjectCount: this.selectedProjects.size
        };
    }

    async sendRequest() {
        const selectedData = this.getSelectedArray();
        const resultContainer = document.getElementById('requestResult');
        
        if (selectedData.totalProjectCount === 0) {
            resultContainer.textContent = '请先选择项目再发送请求';
            return;
        }

        resultContainer.textContent = '正在发送请求...';

        try {
            // 构建请求数据
            const requestData = {
                selectedProjects: selectedData.selectedProjects,
                totalProjectCount: selectedData.totalProjectCount,
                timestamp: new Date().toISOString()
            };

            // 这里可以替换为真实的API端点
            const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                resultContainer.textContent = `请求成功！\n\n发送的数据：\n${JSON.stringify(requestData, null, 2)}\n\n服务器响应：\n${JSON.stringify(result, null, 2)}`;
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            resultContainer.textContent = `请求失败：${error.message}\n\n本次发送的数据：\n${JSON.stringify({
                selectedProjects: selectedData.selectedProjects,
                totalProjectCount: selectedData.totalProjectCount,
                timestamp: new Date().toISOString()
            }, null, 2)}`;
        }
    }
}

// 初始化级联选择器
document.addEventListener('DOMContentLoaded', () => {
    new CascadeSelector();
});

// 导出供外部使用
window.CascadeSelector = CascadeSelector;